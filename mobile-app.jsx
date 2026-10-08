// =================================================================
// Mobile App root — phone-sized screen routing.
// =================================================================
const { useState: useStateMApp, useEffect: useEffectMApp, useMemo: useMemoMApp } = React;

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
  const [progressMap, progress, saveFailed] = useProgressStore();

  useEffectMApp(() => { applyTheme(tweaks.theme); }, [tweaks.theme]);
  useAudioTweaks(tweaks);

  const activePage = useMemoMApp(() => PAGES_DATA.find(p => p.id === activeId), [activeId]);

  useTimeOnTask(screen === 'color', activeId, progress.addTime);

  const handleOpen = (id) => {
    setActiveId(id);
    setScreen('color');
    progress.markOpened(id);
  };

  const handleComplete = (id) => {
    progress.markComplete(id);
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
      {/* Shown when localStorage rejects a save (usually quota full). Sits just
          under the header bars so it doesn't hide their buttons. */}
      {saveFailed && (
        <div role="alert" style={{
          position: 'absolute', top: 64, left: 0, right: 0, margin: '0 auto', width: 'fit-content', zIndex: 200, pointerEvents: 'none',
          maxWidth: 'min(92%, 560px)', padding: '10px 16px',
          background: 'var(--accent)', color: '#fff',
          border: '2.5px solid var(--ink)', borderRadius: 12, boxShadow: '3px 3px 0 var(--ink)',
          fontSize: 12, fontWeight: 700, lineHeight: 1.4, textAlign: 'center',
        }}>
          Progress isn't saving — this browser's storage is full or turned off (private browsing). Clearing brush strokes on a page frees up space.
        </div>
      )}

      {screen === 'library' && (
        <MobileLibraryScreen progressMap={progressMap} onOpen={handleOpen}
          // TweaksPanel opens on this message; normally the design host sends it,
          // so post it to ourselves to make settings reachable standalone.
          onSettings={() => window.postMessage({ type: '__activate_edit_mode' }, '*')}
          onGrownUps={() => { /* no dashboard on mobile yet; this button cycles the theme */
          const order = ['warm-classroom', 'bright-playful', 'parchment-museum'];
          const idx = order.indexOf(tweaks.theme);
          setTweak('theme', order[(idx + 1) % order.length]);
        }} />
      )}

      {(screen === 'color' || screen === 'celebrate' || screen === 'quest') && activePage && (
        <MobileColoringScreen
          page={activePage}
          progress={progressMap[activePage.id] || { fills: {} }}
          onProgress={progress.update}
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
          onLibrary={goLibrary}
          onSpeechQuest={() => setScreen('quest')}
        />
      )}

      {screen === 'quest' && activePage && (
        <MobileSpeechGame
          page={activePage}
          tweaks={tweaks}
          onClose={() => setScreen('color')}
          onSolved={(id) => progress.recordQuestEvent(id, 'solved')}
          onQuestEvent={progress.recordQuestEvent}
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
            progress.resetAll();
            goLibrary();
          }} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

window.MobileApp = MobileApp;
