let user = $state({});

export const useUserState = () => {
    return {
        get user() {
            return user;
        },
        set user(u) {
            user = u;
        },
    };
}