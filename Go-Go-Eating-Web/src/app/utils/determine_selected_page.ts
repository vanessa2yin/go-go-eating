// Determine if selected page is Go Eating
export const isMainPage = function(): boolean {
    return localStorage.getItem('selectedPage') === 'GoEating';
}

// Determine if selected page is Explore
export const isExplore = function(): boolean {
    return localStorage.getItem('selectedPage') === 'Explore';
}

// Determine if selected page is Restaurants
export const isRestaurants = function(): boolean {
    return localStorage.getItem('selectedPage') === 'Restaurants';
}

// Determine if selected page is Organize
export const isOrganize = function(): boolean {
    return localStorage.getItem('selectedPage') === 'Organize';
}

// Determine if selected page is Notification
export const isNotification = function(): boolean {
    return localStorage.getItem('selectedPage') === 'Notification';
};