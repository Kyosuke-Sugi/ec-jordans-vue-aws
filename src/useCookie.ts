
export const useCookie = () => {
    const cookies = document.cookie;
    let cookieArray = []

    if (!cookies) {
      return undefined;
    } else {
    //   const cookiesArray = cookies.split("; ");

    //   const cookie = cookiesArray.filter(function (cookie) {
    //     return cookie.includes("userID");
    //   });
    //   cookieArray = cookie[0].split("=");
        cookieArray = cookies.split("=")
    }

    return cookieArray[1]
}
