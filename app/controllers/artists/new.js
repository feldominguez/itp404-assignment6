import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createArtist: function(e) {
      e.preventDefault();
      var artist = this.get('artistName');
      console.log(artist);


      var promise = Ember.$.ajax({
        type: 'post',
        url: 'http://itp-api.herokuapp.com/api/artists',
        data: {
          "name": artist
        }
      });

      promise.then((r) => {

        this.set('artistName', null);

        var artists = this.get('model.artists');
        var newArtists = artists.concat(r.artist);
        this.set('model.artists', newArtists);
        this.transitionToRoute('artists');
      }, function(){
        alert('The Artist already exists');
      });

    }
  }



});
