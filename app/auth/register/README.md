# Register module

This folder holds the registration flow for the app. The UI has been split into small presentational components and a single hook that owns form state and validation.

Structure
- `page.tsx` - page container; it composes the branding, steps, and uses the hook.
- `types.ts` - shared TypeScript types for the form.
- `_components/` - presentational components and small form controls.
  - `BrandingPanel.tsx` - left-side marketing panel.
  - `FormHeader.tsx` - the compact header used on mobile and above the steps.
  - `FormNavigation.tsx` - previous/continue/submit button group.
  - `Alert.tsx` - small alert box for submit errors.
  - `AuthFooter.tsx` - small footer with sign-in link.
  - `Step1Personal.tsx`, `Step2Business.tsx`, `Step3Preferences.tsx` - step UIs.
  - `FormControls/*` - `TextInput`, `PasswordInput`, `Select`, `RadioGroup`, `Checkbox`.
- `_hooks/useRegisterForm.ts` - the hook that contains the form state, validation and submit handler.

Key contracts
- useRegisterForm returns:
  - `formData` - object shaped by `FormData` in `types.ts`.
  - `errors` - validation errors.
  - `loading` - submit loading boolean.
  - step navigation functions: `handleNextStep`, `handlePrevStep`, `handleSubmit`.
  - `handleInputChange` - single onChange handler for controlled inputs.

Notes
- Components under `_components` are outside Next's route system thanks to the underscore prefix.
- Keep presentational components small and prop-driven. Business logic belongs in the hook.

When to run the build
- If you plan to run `pnpm build` or `pnpm dev`, run it to surface any cross-file type errors after changes.
