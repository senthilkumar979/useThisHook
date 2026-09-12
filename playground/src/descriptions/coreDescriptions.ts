export const coreDescriptions: Record<string, string> = {
  useToggle:
    'You have a panel, switch, or “show more” control. You do not want a raw boolean plus setState(!value) in three places. useToggle is that flag with names that match the UI: turn it on, turn it off, or flip it.',
  useCounter:
    'A quantity picker, score, or “how many extra seats” control. You keep incrementing and decrementing by the same step and sometimes jump to an exact number. That is this hook, not three separate setCount calls you have to keep consistent.',
  useDisclosure:
    'A menu, drawer, or dialog is either visible or not. Buttons need Open, Close, and sometimes Toggle. useDisclosure is that lifecycle so you are not mixing a boolean named isOpen with ad-hoc setters.',
  useDebounce:
    'The user is typing into search or a filter. You do not want to hit the server or filter a huge list on every keystroke. Debounce the value, then use the lagged copy for the expensive work. The input itself stays instant.',
  usePrevious:
    'You need to know what a prop or piece of state was last render: animate from old to new, skip work when nothing changed, or compare a selected id. usePrevious is that last value without storing it by hand.',
  useInterval:
    'You need a ticking clock, a poll, or a progress bar that advances on a schedule. You are tired of setInterval inside useEffect, stale closures, and forgetting clearInterval. Pass null to pause without tearing the component down.',
  useCopyToClipboard:
    'A “Copy invite link” or “Copy code” button. You need to write to the clipboard and show Copied for a moment. This hook is that interaction, including failure when the browser blocks clipboard access.',
  useLocalStorage:
    'A preference should survive refresh: theme, sidebar width, last used project. You want useState that writes JSON to localStorage. This is that pair of value and setter, with a fallback if storage is empty or corrupt.',
  useDocumentTitle:
    'This screen should own the browser tab title (Inbox (3), Settings, a document name) and give the previous title back when the user leaves. Put the hook in the page component instead of scattering document.title assignments.',
};
