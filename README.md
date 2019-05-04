# YouDeeSpot

#### Main: [https://youdeespot.com](https://youdeespot.com)

### Resources  
[Progressive Web App and published it in 3 app stores](https://medium.freecodecamp.org/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned-7cb3f56daf9b)  
[AWW](https://awwapp.com/b/ucwizf5i3/?dis=%5B%5B%22no-init-modal%22%5D%2C%5B%22join-board%22%5D%5D)  
[Customize Media Notifications and Handle Playlists](https://developers.google.com/web/updates/2017/02/media-session)  
[Reverse-engineering YouTube](https://tyrrrz.me/Blog/Reverse-engineering-YouTube)

```javascript
/**
 * TODO!!!
 * 
 * Add this to pwajs server file to serve the files inside node_modules/@pwajs
 * app.use('/resources', express.static(process.cwd() + '/src/resources/'));
 * 
 * Add to src/server.js file to serve the static css
 * head.push(<link type="text/css" id="fucssStyle" rel="stylesheet" href="/resources/css/style.css" />)
 * 
 * Add to src/cleant.js to autoreload the file when its done with rerendering
 * document.querySelector('#fucssStyle').href = '/resources/css/style.css' + '?' + new Date().getTime();
 * 
 * Add to src/webpack.js fucss support
 * 
 * import { PwaFucssPlugin } from 'next-fucss';
 * 
 * and
 * 
 * addPlugin(new PwaFucssPlugin({
 *    styleFile: '/src/resources/css/style.css' 
 * }));
 * 
 */
 
 ```
 
 ## PM2
 
 ```javascript
 npm install -g pm2
 pm2 start ./dist/server.js
 cd bin/serverless
 pm2 start npm --- run start
 ```
 ## Node
 (https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
 
 ## ngnix
 (https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)  
 (https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)  
 (https://www.liaohuqiu.net/posts/nginx-proxy-pass/)
 
 #### Example File: /bin/default
 
 ```javascript
 sudo nano /etc/nginx/sites-available/default
 sudo systemctl reload nginx
 ```
 
## Hasura
(https://docs.docker.com/compose/install/#install-compose)

#### Example File: /bin/docker-compose.yml
#### Default File: wget https://raw.githubusercontent.com/hasura/graphql-engine/master/install-manifests/docker-compose/docker-compose.yaml

```javascript
docker-compose up -d
docker-compose stop || docker-compose down
```
 
### Setup Sever With Docker
`sudo apt-get update`  
`sudo apt-get remove docker docker-engine docker.io containerd runc`  
`sudo apt-get install     apt-transport-https     ca-certificates     curl     gnupg-agent     software-properties-common`  
`curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`  
`sudo add-apt-repository    "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"`  
`sudo apt-get update`  
`sudo apt-get install docker-ce docker-ce-cli containerd.io`  
`sudo apt-get install wget ca-certificates`  
`wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -`  
`sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'`  
`sudo apt-get update`  
`sudo apt-get install postgresql postgresql-contrib`  
`wget https://raw.githubusercontent.com/hasura/graphql-engine/master/install-manifests/docker-compose/docker-compose.yaml`  
`apt install docker-compose`  
`docker-compose up -d`  