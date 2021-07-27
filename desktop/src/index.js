const { app, BrowserWindow } = require('electron');
const { is, setContentSecurityPolicy } = require('electron-util');

const config = require('./config');

let window;

function createWindow(){
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });

  // CSP설정 (Content Security Policy - 리소스로드할수 있는 도메인 지정)
  if (!is.development) {
    setContentSecurityPolicy(`
    default-src 'none';
    script-src 'self';
    img-src 'self' https://www.gravatar.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    connect-src 'self' ${config.PRODUCTION_API_URL};
    base-uri 'none';
    form-action 'none';
    frame-ancestors 'none';
  `);
  }

  if(is.development){
    window.webContents.openDevTools();
    window.loadURL(config.LOCAL_WEB_URL);
  } else {
    window.loadURL(config.PRODUCTION_WEB_URL);
  }

  window.on('closed', () => {
    window = null;
  });

  
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin'){
    app.quit();
  }
});

app.on('activate', () => {
  if(window === null){
    createWindow();
  }
})