import * as R from 'ramda';

export const customFilter = (value, units) => {
  /**
   * Filtering all available units using helper function
   * where we set value in lower case which is a search query
   * as well as target fields (title, description) of each unit
   * and check whether any of target fields include search query
   * */
  const helper = unit => {
    let lowerValue = R.toLower(value);
    let lowerTargetFields = R.map(R.toLower, R.props(["title", "description"], unit));
    return R.any(R.includes(lowerValue))(lowerTargetFields);
  }

  return R.filter(helper, units);
}

