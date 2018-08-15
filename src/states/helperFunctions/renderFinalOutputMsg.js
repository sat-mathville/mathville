export default function renderFinalOutput (score,questionsLength) {
  if (score === questionsLength) {
    return 'Congratulations! You have leveled up!'
  } else {
    return `I'm sorry. You have not answered enough questions correctly. \n Please come back for some more magic practice!`
  }
}
