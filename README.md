# react-udemy

Activities with Udemy, [React - The Complete Guide 2024 (incl. Next.js, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=LEARNNOWPLANS), by Maximilian Schwarzmüller

`npm install`
`npm run dev`

- 01, `useState()` tests
- 02, game, tic-tac-toe
- 03, investment calculator
- 04, component styles
- 05, passing refs and using portals
- 06, prop drlling, using Tailwind styles
- 07, refactoring -- replacing `useState()` and using `useContext()` with `useReducer()`
- 08, refactoring -- implementing `useEffect()` and its cleanup function, also `useCallback()`
- 09, quiz game -- applying timers with `progress` indicator, & techniques with `useEffect()`, `useCallback()`, `useRef()`
- 10, placepicker -- `fetch()`, `useEffect()`, error dialog, geolocation, Node local backed (run `npm install`, then `node app.js` in a separate terminal window)
- 11, placepicker refactoring with custom hook `useDataFetch()`[^1], promisifying using `new Promise()`[^2]
- 12, form validation, refactoring with custom hook -- `useState`[^3], `useRef`[^4], `FormData`[^5], validation `onBlur()`[^6], custom hook `useInput()`[^7]
- 13, food order app, theory to action -- practical applications of custom hooks `useHttp`, applying `useEffect()`, sharing functions and state with `createContext()`, reusable `Dialog`, and `Error` messaging display
- 14, reviewing Redux Tookit -- `configureStore()`, `createSlice()`, `initialState`, `action.payload` for passing values to `reducers`
- 15, shopping cart -- Redux, implementing http `async` tasks & side effects, sending data to Firebase, action creators; initial attempt and refined approach including fetching stored data
- 16, router integrations -- `createBrowserRouter`, `Outlet` for surrounding content, `errorElement` for `404` page, `NavLink`, `useNavigate()` for programatic navigation, `useParams()` for values in path; using `loader`, `useNavigation` for accessing `navigation.state === "loading"`, throwing an error `Response` ie. so we can check for `404` or `500`, `useRouteLoaderData()`[^8] when using a common loader w/ child routes, `Form` for sumitting form data, `redirect` on form submission, `useFetcher()`[^9] for triggering an action w/o navigating, `defer()`/`Suspense`/`Await`/`fallback`[^10] to display loading message if there is a delay with backend, using `await` in `defer()`[^10] to control if content should be rendered while data loads

[^1]: placepicker, `useDateFetch.js`
[^2]: placepicker, `AvailablePlaces.jsx`
[^3]: validations, `LoginUsingState.jsx`
[^4]: validations, `Login.jsx`
[^5]: validations, `Signup.jsx`
[^6]: validations, `LoginUsingState.jsx`
[^7]: validations-refactor, `useInput.js`
[^8]: router exercise, `frontend/src/pages/EventDetailUsingLoader.js`
[^9]: router exercise, `frontend/src/components/NewsletterSignup.js`
[^10]: router exercise, `frontend/src/pages/EventDetailUsingLoader.js`
