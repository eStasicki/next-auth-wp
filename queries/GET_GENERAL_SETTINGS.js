import gql from 'graphql-tag';

export const GET_GENERAL_SETTINGS_QUERY = gql`
{
  headlessSettings {
    ustawieniaAplikacji {
      mainApplicationLink
      logo
    }
  }
}
`;

export default GET_GENERAL_SETTINGS_QUERY;
