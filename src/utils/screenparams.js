const fetchScreenParams = () => {
    let contentWidth = [...document.body.children].reduce((a, el) => Math.max(a, el.getBoundingClientRect().right), 0) - document.body.getBoundingClientRect().x;

    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const pageWidth = Math.min(document.body.scrollWidth, contentWidth);
    const pageHeight = document.body.scrollHeight;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pageX = document.body.getBoundingClientRect().x;
    const pageY = document.body.getBoundingClientRect().y;
    const screenX = window.screenX; //Return the x  coordinates of the window relative to the screen
    const screenY = window.screenY //- (window.outerHeight - window.innerHeight); //Return the y coordinates of the window relative to the screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let currentScreenParameters = {
      type: "currentScreenParameters",
      values: [windowWidth, windowHeight, pageWidth, pageHeight, screenWidth, screenHeight, pageX, pageY, screenX,
        screenY, viewportWidth, viewportHeight]
    }
    return JSON.stringify(currentScreenParameters)
  }


  export default fetchScreenParams;