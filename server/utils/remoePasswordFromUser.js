const removePasswordFromUser = (user) => {
    const {password, ...other} = user;
    return other;
}

export default removePasswordFromUser;