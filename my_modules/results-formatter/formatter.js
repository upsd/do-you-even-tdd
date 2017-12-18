module.exports = (title, results) => {
    let formattedResults = results
        .map(r => `\n\t${r.name} \n\t${r.points} \n--`);
    return `\n\nQUERY: ${title} \n----------`
        .concat(formattedResults)
        .toString()
        .replace(/,/g, "");
};