// =================================================================
// Top-level App — screen routing + Tweaks integration
// =================================================================
const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

function applyTheme(themeKey) {
  const t = THEMES[themeKey] || THEMES['warm-classroom'];
  Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS || {
    theme: 'warm-classroom',
    art_style: 'classic',
    animation_style: 'alive',
    speech_game_style: 'tap-choice',
    show_chrome: true,
    age_density: 'mid',
  });

  const [screen, setScreen] = useStateApp('library'); // 'library' | 'color' | 'celebrate' | 'quest' | 'dashboard'
  const [activeId, setActiveId] = useStateApp(null);
  // progressMap: id -> { fills, completed, midShown, celebrated, questSolved }
  const [progressMap, setProgressMap] = useStateApp(() => {
    try {
      const raw = localStorage.getItem('hcb-progress-v1');
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  });

  const [saveFailed, setSaveFailed] = useStateApp(false);
  useEffectApp(() => {
    try {
      localStorage.setItem('hcb-progress-v1', JSON.stringify(progressMap));
      setSaveFailed(false);
    } catch(e) { setSaveFailed(true); }
  }, [progressMap]);

  useEffectApp(() => { applyTheme(tweaks.theme); }, [tweaks.theme]);

  // Mute / unmute audio based on Tweak
  useEffectApp(() => {
    if (window.setMuted) window.setMuted(!tweaks.sound_on);
  }, [tweaks.sound_on]);

  // Push voice overrides to the audio module
  useEffectApp(() => {
    window.__voiceOverrides = {
      name: tweaks.voice_override || 'auto',
      rateMul: (tweaks.voice_rate || 100) / 100,
      pitchMul: (tweaks.voice_pitch || 100) / 100,
    };
  }, [tweaks.voice_override, tweaks.voice_rate, tweaks.voice_pitch]);

  // Track available voices so the picker can list them.
  const [voiceList, setVoiceList] = useStateApp([]);
  useEffectApp(() => {
    if (!window.speechSynthesis) return;
    const refresh = () => {
      const list = window.speechSynthesis.getVoices() || [];
      // Show English first, then everything else — Firefox sometimes only exposes the OS default
      const en = list.filter(v => v.lang && v.lang.toLowerCase().startsWith('en'));
      const other = list.filter(v => !v.lang || !v.lang.toLowerCase().startsWith('en'));
      setVoiceList([...en, ...other]);
    };
    refresh();
    window.speechSynthesis.addEventListener && window.speechSynthesis.addEventListener('voiceschanged', refresh);
    window.speechSynthesis.onvoiceschanged = refresh;
    // Some browsers need a gentle nudge — refresh on first user interaction & retry a few times
    const onTouch = () => { refresh(); window.removeEventListener('pointerdown', onTouch); };
    window.addEventListener('pointerdown', onTouch, { once: true });
    const timers = [setTimeout(refresh, 400), setTimeout(refresh, 1500), setTimeout(refresh, 3000)];
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('pointerdown', onTouch);
      if (window.speechSynthesis.removeEventListener) window.speechSynthesis.removeEventListener('voiceschanged', refresh);
    };
  }, []);

  const activePage = useMemoApp(() => PAGES_DATA.find(p => p.id === activeId), [activeId]);

  // Track time-on-task while a page is open in the coloring screen. Committed
  // every 30s and when leaving, not on every tick: each commit re-saves the
  // whole progress map (brush strokes included) to localStorage.
  // Time while the tab is hidden (another tab, laptop closed) is not counted,
  // and hiding the tab commits right away, so closing it rarely loses time.
  useEffectApp(() => {
    if (screen !== 'color' || !activeId) return;
    let last = document.hidden ? null : Date.now();
    const commit = () => {
      if (last === null) return;
      const now = Date.now();
      const delta = now - last;
      last = now;
      if (delta <= 0) return;
      setProgressMap(m => {
        const cur = m[activeId] || {};
        return { ...m, [activeId]: { ...cur, timeMs: (cur.timeMs || 0) + delta } };
      });
    };
    const onVisibility = () => {
      if (document.hidden) { commit(); last = null; }
      else last = Date.now();
    };
    document.addEventListener('visibilitychange', onVisibility);
    const handle = setInterval(commit, 30000);
    return () => {
      clearInterval(handle);
      document.removeEventListener('visibilitychange', onVisibility);
      commit();
    };
  }, [screen, activeId]);

  const handleOpen = (id) => {
    setActiveId(id);
    setScreen('color');
    // Bump opens + lastOpenedAt
    setProgressMap(m => {
      const cur = m[id] || {};
      return { ...m, [id]: { ...cur, opens: (cur.opens || 0) + 1, lastOpenedAt: Date.now() } };
    });
  };

  // Called by SpeechGame on every blank answered (correct or wrong) and on solve.
  const recordQuestEvent = (id, type) => {
    setProgressMap(m => {
      const cur = m[id] || {};
      const q = cur.quest || { correct: 0, wrong: 0, solved: false };
      const next = { ...q };
      if (type === 'correct') next.correct = q.correct + 1;
      else if (type === 'wrong') next.wrong = q.wrong + 1;
      else if (type === 'solved') next.solved = true;
      return { ...m, [id]: { ...cur, quest: next, lastOpenedAt: Date.now() } };
    });
  };

  const resetPage = (id) => {
    if (!confirm('Erase coloring and Word Quest progress for this page?')) return;
    setProgressMap(m => {
      const n = { ...m };
      delete n[id];
      return n;
    });
  };
  const resetAll = () => {
    setProgressMap({});
    try { localStorage.removeItem('hcb-progress-v1'); } catch(e){}
    setScreen('library'); setActiveId(null);
  };

  const updateProgress = (id, prog) => {
    setProgressMap(m => ({ ...m, [id]: prog }));
  };

  const handleComplete = (id) => {
    setProgressMap(m => ({ ...m, [id]: { ...(m[id]||{}), completed: true, celebrated: true } }));
    setScreen('celebrate');
  };

  const goLibrary = () => { setScreen('library'); setActiveId(null); };

  // Cycle helpers for radio tweaks
  const themeOptions = [
    { value: 'warm-classroom', label: 'Warm Classroom' },
    { value: 'bright-playful', label: 'Bright & Playful' },
    { value: 'parchment-museum', label: 'Parchment Museum' },
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100vw', height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-app)',
    }}>
      {/* "Tablet" subtle vignette */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 80px rgba(0,0,0,0.35)', zIndex: 30 }} />

      {/* Shown when localStorage rejects a save (usually quota full) */}
      {saveFailed && (
        <div role="alert" style={{
          position: 'absolute', top: 12, left: 0, right: 0, margin: '0 auto', width: 'fit-content', zIndex: 200, pointerEvents: 'none',
          maxWidth: 'min(92%, 560px)', padding: '10px 16px',
          background: 'var(--accent)', color: '#fff',
          border: '2.5px solid var(--ink)', borderRadius: 12, boxShadow: '3px 3px 0 var(--ink)',
          fontSize: 14, fontWeight: 700, lineHeight: 1.4, textAlign: 'center',
        }}>
          Progress isn't saving — this browser's storage is full or turned off (private browsing). Clearing brush strokes on a page frees up space.
        </div>
      )}

      {/* Screen stack */}
      {screen === 'library' && (
        <LibraryScreen progressMap={progressMap} onOpen={handleOpen} onGrownUps={() => setScreen('dashboard')} />
      )}

      {screen === 'dashboard' && (
        <DashboardScreen
          progressMap={progressMap}
          pages={PAGES_DATA}
          tweaks={tweaks}
          setTweak={setTweak}
          voiceList={voiceList}
          onBack={goLibrary}
          onOpen={handleOpen}
          onResetPage={resetPage}
          onResetAll={resetAll}
        />
      )}

      {(screen === 'color' || screen === 'celebrate' || screen === 'quest') && activePage && (
        <ColoringScreen
          page={activePage}
          progress={progressMap[activePage.id] || { fills: {} }}
          onProgress={updateProgress}
          onBack={goLibrary}
          onComplete={handleComplete}
          onShowQuest={(id) => setScreen('quest')}
          tweaks={tweaks}
        />
      )}

      {screen === 'celebrate' && activePage && (
        <Celebration
          page={activePage}
          fills={(progressMap[activePage.id] || {}).fills || {}}
          strokes={(progressMap[activePage.id] || {}).strokes || []}
          tweaks={tweaks}
          alreadyDone={false}
          onClose={() => setScreen('color')}
          onLibrary={goLibrary}
          onSpeechQuest={() => setScreen('quest')}
        />
      )}

      {screen === 'quest' && activePage && (
        <SpeechGame
          page={activePage}
          tweaks={tweaks}
          onClose={() => setScreen('color')}
          onSolved={(id) => {
            setProgressMap(m => ({ ...m, [id]: { ...(m[id]||{}), questSolved: true } }));
            recordQuestEvent(id, 'solved');
          }}
          onQuestEvent={recordQuestEvent}
        />
      )}

      {/* Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Visual vibe">
          <TweakSelect
            label="Theme"
            value={tweaks.theme}
            options={themeOptions}
            onChange={(v) => setTweak('theme', v)}
          />
        </TweakSection>

        <TweakSection label="Animation when complete">
          <TweakRadio
            label="Style"
            value={tweaks.animation_style}
            onChange={(v) => setTweak('animation_style', v)}
            options={[
              { value: 'alive', label: 'Alive' },
              { value: 'confetti', label: 'Confetti' },
              { value: 'mini-scene', label: 'Sparkle' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Word Quest style">
          <TweakRadio
            label="Mode"
            value={tweaks.speech_game_style}
            onChange={(v) => setTweak('speech_game_style', v)}
            options={[
              { value: 'tap-choice', label: 'Tap Word' },
              { value: 'drag-drop', label: 'Drag & Drop' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Age / density">
          <TweakRadio
            label="Level"
            value={tweaks.age_density}
            onChange={(v) => setTweak('age_density', v)}
            options={[
              { value: 'big', label: 'K–2' },
              { value: 'mid', label: 'Grade 3–5' },
            ]}
          />
        </TweakSection>

        <TweakSection label="Sound">
          <TweakToggle
            label="Sound effects + read-aloud"
            value={tweaks.sound_on}
            onChange={(v) => setTweak('sound_on', v)}
          />
          <TweakToggle
            label="Auto-narrate Word Quest"
            value={tweaks.auto_narrate}
            onChange={(v) => setTweak('auto_narrate', v)}
          />
        </TweakSection>

        <TweakSection label="Narrator voice">
          {voiceList.length === 0 ? (
            <div style={{
              padding: '10px 12px',
              background: 'rgba(200,16,46,0.10)',
              border: '1.5px dashed rgba(200,16,46,0.5)',
              borderRadius: 8,
              fontSize: 12, lineHeight: 1.45,
              color: 'inherit',
            }}>
              <b>No voices detected.</b><br/>
              Firefox often exposes no voices on macOS/Linux. Try Chrome, Safari, or Edge for the best read-aloud — on Mac/iPad you can also install Enhanced voices under <i>System Settings → Accessibility → Spoken Content</i>.
            </div>
          ) : (
            <TweakSelect
              label="Voice"
              value={tweaks.voice_override || 'auto'}
              options={[{ value: 'auto', label: 'Auto — pick per page' }].concat(voiceList.map(v => ({ value: v.name, label: v.name + (v.lang ? ' · ' + v.lang : '') })))}
              onChange={(v) => setTweak('voice_override', v)}
            />
          )}
          <TweakSlider
            label="Speed"
            value={tweaks.voice_rate}
            min={60} max={140} step={5} unit="%"
            onChange={(v) => setTweak('voice_rate', v)}
          />
          <TweakSlider
            label="Pitch"
            value={tweaks.voice_pitch}
            min={60} max={140} step={5} unit="%"
            onChange={(v) => setTweak('voice_pitch', v)}
          />
          <TweakButton label="🔊 Test narrator" onClick={() => {
            if (!window.speech) return;
            const sample = activePage && activePage.quest
              ? `${activePage.quest.heading}. ${activePage.quest.lines.map(l => l.replace(/\{(\d+)\}/g, (_,n) => activePage.quest.blanks[parseInt(n,10)].answer)).join(' ')}`
              : "Four score and seven years ago, our fathers brought forth on this continent a new nation, conceived in liberty.";
            const voice = (activePage && activePage.quest && activePage.quest.voice) || {};
            window.speech.speak(sample, { rate: voice.rate || 0.84, pitch: voice.pitch || 0.92, voiceHints: voice.hints });
          }} />
        </TweakSection>

        <TweakSection label="Quick actions">
          <TweakButton label="Reset all progress" onClick={() => {
            if (!confirm('Erase all coloring progress and stickers?')) return;
            setProgressMap({});
            try { localStorage.removeItem('hcb-progress-v1'); } catch(e){}
            goLibrary();
          }} />
          <TweakButton label="Auto-fill current page" secondary onClick={() => {
            if (!activePage) return alert('Open a page first');
            const palette = CRAYONS.filter(c => c.hex !== '#FFFFFF');
            const fills = {};
            activePage.regions.forEach((r,i) => { fills[r] = palette[i % palette.length].hex; });
            setProgressMap(m => ({ ...m, [activePage.id]: { ...(m[activePage.id]||{}), fills } }));
          }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

window.App = App;
