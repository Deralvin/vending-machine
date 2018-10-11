
<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Add Item</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Item Name:</label>
                        <input type="text" class="form-control" v-model="item.name"/>
                    </div>
                    <div class="form-group">
                        <label>Item Price:</label>
                        <input type="text" class="form-control" v-model="item.price"/>
                    </div>
                    <div class="form-group">
                        <label>Item Price:</label>
                        <input type="file" class="form-control" name="image" id="image" @change="onFileChange"/>
                    </div>
                    <div class="form-group">
                        <button v-on:click="test()">Check Data</button>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Add Item"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    name: "AddItem"
  },
  data() {
    return {
      image: "",
      item: {
        name: "",
        price: 0,
        picture: ""
      }
    };
  },
  methods: {
    onFileChange(e) {
      var files = e.target.files[0] || e.dataTransfer.files;
      this.image=files
      var nama = e.target.files[0].name;
      this.item.picture = nama;
      console.log(this.item);
      //   var exe=e.target.files[0].type
      //   var finish = nama.split('.')
      //   var test = current.getDate+'.'+finish[1]
      //   console.log(test)
      //   this.item.picure=nama
      console.log(nama);
    },
    
    addItem() {
      console.log(this.item);
      const formData = new FormData();
      formData.append("imageItem", this.image);
      const config = {
        headers: {
          "content-type": "application/x-www-form-urlencoded"
        }
      };
      axios
        .post("http://localhost:4000/items/upload/image", formData, config)
        .then(response => {
          this.$router.push({ name: 'Index' });
        })
        .catch(error => {});

      let uri = "http://localhost:4000/items/add";
      this.axios.post(uri, this.item).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>