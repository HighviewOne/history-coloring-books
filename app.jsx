// =================================================================
// Top-level App — screen routing + Tweaks integration
// =================================================================
const { useState: useStateApp, useEffect: useEffectApp, useMemo: useMemoApp } = React;

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
  const [progressMap, progress, saveFailed] = useProgressStore();

  useEffectApp(() => { applyTheme(tweaks.theme); }, [tweaks.theme]);
  useAudioTweaks(tweaks);

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

  useTimeOnTask(screen === 'color', activeId, progress.addTime);

  const handleOpen = (id) => {
    setActiveId(id);
    setScreen('color');
    progress.markOpened(id);
  };

  const resetPage = (id) => {
    if (!confirm('Erase coloring and Word Quest progress for this page?')) return;
    progress.resetPage(id);
  };

  const handleComplete = (id) => {
    progress.markComplete(id);
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
          onResetAll={() => { progress.resetAll(); goLibrary(); }}
        />
      )}

      {(screen === 'color' || screen === 'celebrate' || screen === 'quest') && activePage && (
        <ColoringScreen
          page={activePage}
          progress={progressMap[activePage.id] || { fills: {} }}
          onProgress={progress.update}
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
          onSolved={(id) => progress.recordQuestEvent(id, 'solved')}
          onQuestEvent={progress.recordQuestEvent}
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
            progress.resetAll();
            goLibrary();
          }} />
          <TweakButton label="Auto-fill current page" secondary onClick={() => {
            if (!activePage) return alert('Open a page first');
            const palette = CRAYONS.filter(c => c.hex !== '#FFFFFF');
            const fills = {};
            activePage.regions.forEach((r,i) => { fills[r] = palette[i % palette.length].hex; });
            progress.patch(activePage.id, { fills });
          }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

window.App = App;
