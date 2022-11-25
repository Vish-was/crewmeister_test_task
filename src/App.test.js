/* eslint-disable react/react-in-jsx-scope */
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

// eslint-disable-next-line no-undef
test('renders app component', () => {
  const initialState = {
    absence : [
      {
        admitterId: null,
        admitterNote: "",
        confirmedAt: "2020-12-12T18:03:55.000+01:00",
        createdAt: "2020-12-12T14:17:01.000+01:00",
        crewId: 352,
        endDate: "2021-01-13",
        id: 2351,
        memberNote: "",
        rejectedAt: null,
        startDate: "2021-01-13",
        type: "sickness",
        userId: 2664
      },
      {
        admitterId: null,
        admitterNote: "Sorry",
        confirmedAt: null,
        createdAt: "2021-01-03T17:36:52.000+01:00",
        crewId: 352,
        endDate: "2021-01-05",
        id: 2521,
        memberNote: "ganzer tag",
        rejectedAt: "2021-01-03T17:39:50.000+01:00",
        startDate: "2021-01-05",
        type: "vacation",
        userId: 2664
      }
    ],
    member : [
      {
        crewId: 352,
        id: 709,
        image: "https://loremflickr.com/300/400",
        name: "Max",
        userId: 644
      },
      {
        crewId: 352,
        id: 713,
        image: "https://loremflickr.com/300/400",
        name: "Ines",
        userId: 649
      },
    ]
  };
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares);
  let store = mockStore(initialState);
  render(
    // eslint-disable-next-line react/react-in-jsx-scope
    <Provider store={store}>
      <App />
    </Provider>
  );
});
