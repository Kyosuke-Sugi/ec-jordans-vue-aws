
export const useCookie = () => {
    const cookies = document.cookie;
    let cookieArray = []

    if (!cookies) {
      return undefined;
    } else {
      const cookiesArray = cookies.split("; ");

      const cookie = cookiesArray.filter(function (cookie) {
        return cookie.includes("userID");
      });
      cookieArray = cookie[0].split("=");
        return cookieArray[1]
    }

}

export const useName = () => {
    const cookies = document.cookie;
    let cookieArray = []

    if (!cookies) {
      return undefined;
    } else {
      const cookiesArray = cookies.split("; ");

      const cookie = cookiesArray.filter(function (cookie) {
        return cookie.includes("userName");
      });
      cookieArray = cookie[0].split("=");
      
        return decodeURI(cookieArray[1]);
    }

}
