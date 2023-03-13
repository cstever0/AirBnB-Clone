export const arrayToObj = (array) => {
    const newState = {};
    array.forEach(element => {
        newState[element.id] = element
    });
    return newState;
};
