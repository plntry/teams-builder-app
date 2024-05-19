const checkCompatibilitiesData = (
  chosenCandidates,
  candidates,
  compatibilities
) => {
  let res = {
    isFullData: true,
    pairs: [],
  };

  // Group candidates by their specializations
  let candidatesById = {};
  let specializations = {};

  candidates.forEach((candidate) => {
    candidatesById[candidate.candidate_id] = candidate;
    if (!specializations[candidate.specialization_name]) {
      specializations[candidate.specialization_name] = [];
    }
    specializations[candidate.specialization_name].push(candidate.candidate_id);
  });

  // Function to check if a compatibility exists
  const hasCompatibility = (id1, id2) => {
    return compatibilities.some(
      (comp) =>
        (comp.candidate1_id === id1 && comp.candidate2_id === id2) ||
        (comp.candidate1_id === id2 && comp.candidate2_id === id1)
    );
  };

  // Check compatibilities between chosen candidates of different specializations
  for (let i = 0; i < chosenCandidates.length; i++) {
    for (let j = i + 1; j < chosenCandidates.length; j++) {
      let candidate1 = candidatesById[chosenCandidates[i]];
      let candidate2 = candidatesById[chosenCandidates[j]];

      if (candidate1.specialization_name !== candidate2.specialization_name) {
        if (!hasCompatibility(candidate1.candidate_id, candidate2.candidate_id)) {
          res.isFullData = false;
          res.pairs.push(`${candidate1.candidate_id}. ${candidate1.fullname} - ${candidate2.candidate_id}. ${candidate2.fullname}`);
        }
      }
    }
  }

  return res;
};

export default checkCompatibilitiesData;
