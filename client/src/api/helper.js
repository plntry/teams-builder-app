import { baseUrl } from "../constants";

let apiHelper = {
  specializations: {
    get: () => {},
  },
  candidates: {
    get: () => {},
  },
  compatibilities: {
    get: () => {}
  }
};

const getSpecializations = async () => {
  const link = `${baseUrl}/specializations`;

  try {
    const response = await fetch(link);
    const jsonData = await response.json();

    const preparedData = await jsonData
      .map((dataEl) => {
        return { ...dataEl, key: dataEl.specialization_id };
      })
      .sort((a, b) => a.specialization_id - b.specialization_id);
    return preparedData;
  } catch (err) {
    console.error(`Error in getting specializations: ${err.message}`);
    return 0;
  }
};

const getCandidates = async (specializations = []) => {
  const link = `${baseUrl}/candidates`;

  try {
    const response = await fetch(link);
    const jsonData = await response.json();

    const preparedData = await jsonData
      .map((dataEl) => {
        return {
          ...dataEl,
          specialization_name: specializations.filter(
            (el) => el.specialization_id === dataEl.specialization_id
          )[0]?.name,
          key: dataEl.candidate_id,
        };
      })
      .sort((a, b) => a.candidate_id - b.candidate_id);

    return preparedData;
  } catch (err) {
    console.error(`Error in getting candidates: ${err.message}`);
  }
};

const getCompatibilities = async (candidates = []) => {
  const link = `${baseUrl}/compatibilities`;

  try {
    const response = await fetch(link);
    const jsonData = await response.json();

    const preparedData = await jsonData
      .map((dataEl) => {
        return {
          ...dataEl,
          candidate1_name: candidates.filter(
            (el) => el.candidate_id === dataEl.candidate1_id
          )[0]?.fullname,
          candidate2_name: candidates.filter(
            (el) => el.candidate_id === dataEl.candidate2_id
          )[0]?.fullname,
          key: dataEl.compatibility_id,
        };
      })
      .sort((a, b) => a.compatibility_id - b.compatibility_id);

    return preparedData;
  } catch (err) {
    console.error(`Error in getting compatibilities: ${err.message}`);
  }
};

apiHelper.specializations.get = getSpecializations;
apiHelper.candidates.get = getCandidates;
apiHelper.compatibilities.get = getCompatibilities;

export default apiHelper;
