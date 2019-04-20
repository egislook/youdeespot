# YouDeeSpot

#### Main: [https://youdeespot.com](https://youdeespot.com)

### Setup Sever
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

### Resources  
[Progressive Web App and published it in 3 app stores](https://medium.freecodecamp.org/i-built-a-pwa-and-published-it-in-3-app-stores-heres-what-i-learned-7cb3f56daf9b)  
[AWW](https://awwapp.com/b/ucwizf5i3/?dis=%5B%5B%22no-init-modal%22%5D%2C%5B%22join-board%22%5D%5D)  
[Customize Media Notifications and Handle Playlists](https://developers.google.com/web/updates/2017/02/media-session)  