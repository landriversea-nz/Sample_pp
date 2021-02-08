
const electron = require('electron')
const ipcMain  = electron.ipcMain;
const { autoUpdater } = require('electron-updater');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// electron.crashReporter.start();
var mainWindow = null;
var port='5000';
var check_done=0;

const taskkill = require('taskkill');
const url = require('url')
const path = require('path');

const exec = require('child_process').exec;
function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};

var loadingwindow=null;

app.on('window-all-closed', function() {
  //if (process.platform != 'darwin') {
    execute('taskkill /F /IM PostProcessor_latest.exe /T', (output) => {
      console.log(output);
    });
    app.quit();
  //}
});

app.on('ready', function() {
  // call python?
  //var subpy = require('child_process').spawn('python', ['Postprocessor_flask.py',port]);

  var subpy = require('child_process').execFile('PostProcessor_latest.exe');
  
  subpy.stdout.on('data', (data) => {
          console.log(data);
      });

  var rq = require('request-promise');
  var mainAddr = 'http://localhost:5000';
  
  loadingwindow = new BrowserWindow({
    frame : false,
    movable : false,
    width: 650, 
    height: 450,
  })
  const startUrl = path.resolve('activity.html');
  loadingwindow.loadURL(startUrl);
  loadingwindow.show();
  loadingwindow.on('closed', function() {
  loadingwindow = null;   
  });

  loadingwindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  var openWindow = function(){
    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: {nodeIntegration: true, enableRemoteModule: true} });
    // mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.loadURL('http://localhost:5000');
    loadingwindow.close(); 
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.on('closed', function() {
      mainWindow = null;
      subpy.kill('SIGINT');
    });
  };

  var startUp = function(){
    rq(mainAddr)
      .then(function(htmlString){
        console.log('server started!');
        if(check_done==1)
        { 
        openWindow();
        }
      })
      .catch(function(err){
        //console.log('waiting for the server start...');
        startUp();
      });
  };

  // fire!
  
  // startUp();
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.on('update-not-available', () => {
  startUp();
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});