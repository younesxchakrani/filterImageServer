# Contenu :

-dossier "deployment_screenshots" : screenshot du bonne fonctionnement d'instances.
-fichier "server-image-filtering collection" : json d'une collection postman de requette de test.

Url Ec2 : image-filter-server-dev.us-east-1.elasticbeanstalk.com

## Note : 

-Les images depuis wikipédia me cause cette erreur : "Error: Could not find MIME for Buffer <null>". (Le package Jimp a un issue avec la fonction read.)
meme si je remplace : const photo = await Jimp.read(inputURL);
par : const photo = await axios({
        method: "get",
        url: inputURL,
        responseType: "arraybuffer",
      }).then(function ({ data: imageBuffer }) {
        return Jimp.read(imageBuffer);
      });
      
-Je teste donc avec cette image(pas de wikipédia) comme indiqué dans la collection postman : 
  https://images.pexels.com/photos/4629485/pexels-photo-4629485.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260
ou 
https://assets.imgix.net/unsplash/bridge.jpg
ou encore : https://assets.imgix.net/unsplash/turntable.jpg

un url de test : http://image-filter-server-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://images.pexels.com/photos/4629485/pexels-photo-4629485.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260
