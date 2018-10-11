
<template>
    <div>
        <h1>Items</h1>
    
        <table class="table table-hover">
            <thead>
            <tr>
                
                <td>Item Name</td>
                <td>Picture</td>
                <td>Item Price</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key="item._id">
                   
                    <td>{{ item.name }}</td>
                    <td><img :src="'http://localhost:4000/'+item.picture" width="50px"></td>
                    <td>{{item.price}}</td>
                    <td><router-link :to="{name: 'Edit', params: { id: item._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger"  v-on:click="deleteItem(item._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
       
          <router-link :to="{ name: 'Create' }" class="btn btn-success">Add Item</router-link>
      
    </div>
</template>
<script>

    export default {
        data(){
            return{
                items: []
            }
        },

        created: function()
        {
            this.fetchItems();
        },

        methods: {
            fetchItems()
            {
              let uri = 'http://localhost:4000/items';
              this.axios.get(uri).then((response) => {
                  this.items = response.data;
                  console.log(this.items)
              });
            },
            getContentImageLink(video_image) {
   return this.$http.options.root + '/' + video_image;
},
            deleteItem(id)
            {
              let uri = 'http://localhost:4000/items/delete/'+id;
              this.items.splice(id, 1);
              this.axios.get(uri);
            }
            
        }
    }
</script>