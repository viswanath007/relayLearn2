import Relay from 'react-relay';

export default class AppHomeRoute extends Relay.Route {
  static routeName = 'AppHomeRoute';
  static queries = {
    viewer: (Component) => Relay.QL`
      query RootQuery {
        viewer { ${Component.getFragment('viewer')} }
      }
    `,
  };
}


// viewer: () => Relay.QL`
//       query {
//         viewer
//       }
