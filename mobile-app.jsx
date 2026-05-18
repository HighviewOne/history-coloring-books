// =================================================================
// Mobile App root — phone-sized screen routing.
// =================================================================
const { useState: useStateMApp, useEffect: useEffectMApp, useMemo: useMemoMApp } = React;

function applyThemeMobile(themeKey) {
  const t = THEMES[themeKey] || THEMES['warm-classroom'];
  Object.entries(t.vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
}

function MobileApp() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS || {
    theme: 'warm-classroom',
    animation_style: 'alive',
    speech_game_style: 'tap-choice',
    age_density: 'mid',
    sound_on: true,
    auto_narrate: true,
  });

  const [screen, setScreen] = useStateMApp('library');
  const [activeId, setActiveId] = useStateMApp(null);
  const [progressMap, setProgressMap] = useStateMApp(() => {
    try {
      const raw = localStorage.getItem('hcb-progress-v1');
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  });

  useEffectMApp(() => {
    try { localStorage.setItem('hcb-progress-v1', JSON.stringify(progressMap)); } catch(e) {}
  }, [progressMap]);

  useEffectMApp(() => { applyThemeMobile(tweaks.theme); }, [tweaks.theme]);

  useEffectMApp(() => {
    if (window.setMuted) window.setMuted(!tweaks.sound_on);
  }, [tweaks.sound_on]);

  const activePage = useMemoMApp(() => PAGES_DATA.find(p => p.id === activeId), [activeId]);

  const handleOpen = (id) => {
    setActiveId(id);
    setScreen('color');
    setProgressMap(m => {
      const cur = m[id] || {};
      return { ...m, [id]: { ...cur, opens: (cur.opens || 0) + 1, lastOpenedAt: Date.now() } };
    });
  };

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

  const updateProgress = (id, prog) => setProgressMap(m => ({ ...m, [id]: prog }));
  const handleComplete = (id) => {
    setProgressMap(m => ({ ...m, [id]: { ...(m[id]||{}), completed: true, celebrated: true } }));
    setScreen('celebrate');
  };
  const goLibrary = () => { setScreen('library'); setActiveId(null); };

  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      overflow: 'hidden',
      background: 'var(--paper)',
    }}>
      {screen === 'library' && (
        <MobileLibraryScreen progressMap={progressMap} onOpen={handleOpen} onGrownUps={() => { /* dashboard not in mobile; cycle theme as easter egg */
          const order = ['warm-classroom', 'bright-playful', 'parchment-museum'];
          const idx = order.indexOf(tweaks.theme);
          setTweak('theme', order[(idx + 1) % order.length]);
        }} />
      )}

      {(screen === 'color' || screen === 'celebrate' || screen === 'quest') && activePage && (
        <MobileColoringScreen
          page={activePage}
          progress={progressMap[activePage.id] || { fills: {} }}
          onProgress={updateProgress}
          onBack={goLibrary}
          onComplete={handleComplete}
          onShowQuest={() => setScreen('quest')}
          tweaks={tweaks}
        />
      )}

      {screen === 'celebrate' && activePage && (
        <MobileCelebration
          page={activePage}
          fills={(progressMap[activePage.id] || {}).fills || {}}
          strokes={(progressMap[activePage.id] || {}).strokes || []}
          tweaks={tweaks}
          alreadyDone={false}
          onClose={() => setScreen('color')}
          onSpeechQuest={() => setScreen('quest')}
        />
      )}

      {screen === 'quest' && activePage && (
        <MobileSpeechGame
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

      {/* Mobile Tweaks panel */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Visual vibe">
          <TweakSelect
            label="Theme"
            value={tweaks.theme}
            options={[
              { value: 'warm-classroom', label: 'Warm Classroom' },
              { value: 'bright-playful', label: 'Bright & Playful' },
              { value: 'parchment-museum', label: 'Parchment Museum' },
            ]}
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
        <TweakSection label="Sound">
          <TweakToggle
            label="Sound effects"
            value={tweaks.sound_on}
            onChange={(v) => setTweak('sound_on', v)}
          />
          <TweakToggle
            label="Auto-narrate Word Quest"
            value={tweaks.auto_narrate}
            onChange={(v) => setTweak('auto_narrate', v)}
          />
        </TweakSection>
        <TweakSection label="Quick actions">
          <TweakButton label="Reset all progress" onClick={() => {
            if (!confirm('Erase all coloring progress?')) return;
            setProgressMap({});
            try { localStorage.removeItem('hcb-progress-v1'); } catch(e){}
            goLibrary();
          }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

window.MobileApp = MobileApp;
