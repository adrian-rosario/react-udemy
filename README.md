# react-udemy

Activities with Udemy, [React - The Complete Guide 2024 (incl. Next.js, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/?couponCode=LEARNNOWPLANS), by Maximilian Schwarzmüller

`npm install`
`npm run dev`

- 01, **state-tests**
- 02 **game**, tic-tac-toe
- 03 **calculator**
- 04 **component-styles**
- 05 **refs-and-portals**
- 06 **prop-drlling**, using Tailwind styles
- 07 **refactoring-useContext-useReducer** &mdash; replacing `useState()` and using `useContext()` with `useReducer()`
- 08 **refactoring-useEffect** &mdash; implementing `useEffect()` and its cleanup function, also `useCallback()`
- 09 **quiz-game** &mdash; applying timers with `progress` indicator, & techniques with `useEffect()`, `useCallback()`, `useRef()`
- 10 **placepicker** &mdash; `fetch()`, `useEffect()`, error dialog, geolocation, Node local backed (run `npm install`, then `node app.js` in a separate terminal window)
- 11 **placepicker** &mdash; refactoring with custom hook `useDataFetch()`[^1], promisifying using `new Promise()`[^2]
- 12 **form-validation** &mdash; refactoring with custom hook &mdash; `useState`[^3], `useRef`[^4], `FormData`[^5], validation `onBlur()`[^6], custom hook `useInput()`[^7]
- 13 **food-order-app** &mdash; custom hooks `useHttp`, applying `useEffect()`, sharing functions and state with `createContext()`, reusable `Dialog`, and `Error` messaging display
- 14 **redux-toolkit-review** &mdash; `configureStore()`, `createSlice()`, `initialState`, `action.payload` for passing values to `reducers`
- 15 **redux-side-effects** &mdash; Redux, implementing http `async` tasks & side effects, sending data to Firebase, action creators; initial attempt and refined approach including fetching stored data
- 16 **router** &mdash; `createBrowserRouter`, `Outlet` for surrounding content, `errorElement` for `404` page, `NavLink`, `useNavigate()` for programatic navigation, `useParams()` for values in path; using `loader`, `useNavigation` for accessing `navigation.state === "loading"`, throwing an error `Response` ie. so we can check for `404` or `500`, `useRouteLoaderData()`[^8] when using a common loader w/ child routes, `Form` for sumitting form data, `redirect` on form submission, `useFetcher()`[^9] for triggering an action w/o navigating, `defer()`/`Suspense`/`Await`/`fallback`[^10] to display loading message if there is a delay with backend, using `await` in `defer()`[^10] to control if content should be rendered while data loads
- 17 **authentication** &mdash; `useSearchParams()` for using routing to toggle a form mode (`login` vs. `signup` rendering)[^11], displaying errors sent from backend[^12], storing authentication token from backend in local storage[^13], using logout action with route[^14], setting UI based on logged-in status[^15], protecting a route based on logged-in status[^16], log out user after 1 hour (token from backend is only valid for an hour) and clear local token[^17]
- 18 **lazy-loading** &mdash; refactored components and actions routing with `lazy()` and `Suspense`[^18], deploying to Firebase
- 19 **tanstack-query** &mdash; refactoring to utilize [TanStack Query](https://tanstack.com/start/latest)[^19], `QueryClient`[^20], `QueryClientProvider`[^21], updated `FindEventSection` and `NewEvent` to use a consolidated `fetch()` utility[^22], invalidating data to trigger a fresh query using `invalidateQueries`[^23], using `loader: editEventLoader` and `queryClient` to load data before component is rendered[^24], `useIsFetching` for displaying a progress bar[^25]

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
[^11]: authentication, `frontend/src/components/AuthForm.js`
[^12]: authentication, `frontend/src/pages/Authentication.js`, `frontend/src/components/EventForm.js`
[^13]: authentication, `frontend/src/pages/Authentication.js`
[^14]: authentication, `frontend/src/App.js`
[^15]: authentication, `frontend/src/components/MainNavigation.js`, `frontend/src/components/EventsNavigation.js`, `frontend/src/components/EventItem.js`
[^16]: authentication, `frontend/src/App.js`, `checkAuthorizationLoader`
[^17]: authentication, `frontend/src/util/authentication.js`, `frontend/src/pages/Root.js`, `frontend/src/util/tokenActions.js`
[^18]: lazy-loading, `src/App.js`
[^19]: tanstack-query, `src/components/Events/NewEventsSection.jsx`
[^20]: tanstack-query, `src/util/http.js`
[^21]: tanstack-query, `src/App.jsx`
[^22]: tanstack-query, `src/components/Events/FindEventSection.jsx`, `src/components/Events/NewEvent.jsx`, `src/util/http.js`
[^23]: tanstack-query, `src/components/Events/NewEvent.jsx`
[^24]: tanstack-query, `src/App.jsx`, `src/components/Events/EditEvent.jsx`
[^25]: tanstack-query, `src/components/Header.jsx`
