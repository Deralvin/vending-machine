
<template>
    <div>
        <h1>Vending</h1>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name vending</td>
                <td>Location</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key="item._id">
           
                    <td>{{ item.name }}</td>
                    <td>{{ item.longlat }}</td>
                    <td><router-link :to="{name: 'Edit', params: { id: item._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger"  v-on:click="deleteItem(item._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        <router-link :to="{ name: 'CreateVending' }" class="btn btn-success">Add Vending</router-link>
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
              let uri = 'http://localhost:4000/vendings';
              this.axios.get(uri).then((response) => {
                  this.items = response.data;
              });
            },
            deleteItem(id)
            {
              let uri = 'http://localhost:4000/vendings/delete/'+id;
              this.items.splice(id, 1);
              this.axios.get(uri);
            }
        }
    }
</script>