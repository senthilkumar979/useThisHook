import { BrandMark } from '../components/BrandMark';
import { HomeBenefits } from './HomeBenefits';
import { HomeHookIndex } from './HomeHookIndex';
import { HomeInstall } from './HomeInstall';

export const HomePage = () => (
  <div className="mx-auto max-w-4xl space-y-16">
    <header className="space-y-5">
      <BrandMark />
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-violet-300/80">
        Open source React hooks
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
        useThisHook is a typed library of custom React hooks you can drop into any app.
      </h1>
      <p className="max-w-2xl text-lg leading-8 text-zinc-400">
        Stop rewriting toggle, debounce, overlay, wizard, and file-picker logic. Import a named
        hook, wire it to your UI, and ship. This playground is the documentation: try the hook,
        read what it takes and returns, then copy the example.
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href="#install"
          className="rounded-full bg-gradient-to-r from-violet-500 to-sky-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/20"
        >
          Install
        </a>
        <a
          href="#hooks"
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-zinc-100 hover:bg-white/10"
        >
          Browse hooks
        </a>
      </div>
    </header>
    <HomeBenefits />
    <div id="install">
      <HomeInstall />
    </div>
    <div id="hooks">
      <HomeHookIndex />
    </div>
  </div>
);
