
<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Add Vending</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <div class="form-group">
                        <label>Vending Name:</label>
                        <input type="text" class="form-control" v-model="item.name"/>
                    </div>
                    <div class="form-group">
                        <label>Longitude Latitude:</label>
                        <input type="text" class="form-control" v-model="item.longlat"/>
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
export default {
  components: {
      name: 'AddItem'
  },
  data() {
      return {
          item: {}
      }
  },
  methods: {
      addItem() {
                 console.log(this.item)
        let item={
            name:this.item.name,
            longlat:this.item.longlat
        }
           let uri = 'http://localhost:4000/vendings/add';
            this.axios.post(uri, this.item).then((response) => {
                console.log(response.data)
            });
        }
    }
}
</script>