import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createSong: function(e) {
    e.preventDefault();
      var title=this.get('songName');
      var price=this.get('price');
      var createdBy=this.get("createdBy");
      console.log(title,price,createdBy);

      var promise = Ember.$.ajax({
        type: 'post',
        url: 'http://itp-api.herokuapp.com/api/songs',
        data: {
          title: title,
          artist: this.get('model.id'),
          genre: 1,
          price: price,
          createdBy: createdBy
        }
      });

      promise.then((response) => {
        //alert('yay');
        this.set('createdBy', null);
        this.set('price' , null);
        this.set('songName', null);
        var songs = this.get('model.songs');
        // console.log(r);
        // songs.pushObject(r.song);

        var newSongs = songs.concat(response.song);
        this.set('model.songs', newSongs);

      }, function(){
        alert('error');
      });

    }
  }
});
