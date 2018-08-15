export default renderFinalOutput () {
  if (this.score === this.questions.length) {
    return 'Congratulations! You have leveled up!'
  } else {
    return `I'm sorry. You have not answered enough questions correctly. \n Please come back for some more magic practice!`
  }
}
