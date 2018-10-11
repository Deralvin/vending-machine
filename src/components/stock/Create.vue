
<template>
  <div class="container">
      
        <div class="card">
            <div class="card-header">
                <h3>Add Stock</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="addItem">
                    <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Vending Name</label>
                            <select class="custom-select" v-model="item.id_vending">
                                <option selected>Choose Vending</option>
                                <option v-for="data in vendings" v-bind:value="data._id">{{data.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Item Name</label>
                            <select class="custom-select" v-model="item.id_item">
                                <option selected>Choose Item </option>
                                <option v-for="data in items" v-bind:value="data._id">{{data.name}}</option>
                            </select>
                        </div>
                    </div>
                    <h5 style="margin-left:15px;margin-bottom:15px;">Location</h5>

                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <label>Longitude</label>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">LNG</div>
                                </div>
                                <input type="text" class="form-control" id="inlineFormInputGroup" v-model="item.long">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>Latitude</label>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">LAT</div>
                                </div>
                                <input type="text" class="form-control" id="inlineFormInputGroup" v-model="item.lat">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Amount</label>
                                <input type="number" class="form-control" id="exampleInputEmail1" v-model="item.amount">
                            </div>
                        </div>
                    </div>
                  
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Add Stock"/>
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
      item: {
          id_item:'Choose Item',
          id_vending:'Choose Vending',
          amount:0
      },
      items: [],
      vendings: []
    };
  },
  created: function() {
    this.fetchItems();
    this.fetchVending();
  },
  methods: {
    fetchItems() {
      let uri = "http://localhost:4000/items";
      this.axios.get(uri).then(response => {
        this.items = response.data;
        console.log(this.items);
      });
    },
    fetchVending() {
      let uri = "http://localhost:4000/vendings";
      this.axios.get(uri).then(response => {
        this.vendings = response.data;
        console.log(this.vendings);
      });
    },
    addItem() {
      console.log(this.item);
      let item = {
        name: this.item.name,
        longlat: this.item.longlat
      };
      let uri = "http://localhost:4000/stocks/add";
      this.axios.post(uri, this.item).then(response => {
        this.$router.push({name:'indexStock'})
        console.log(response.data);
      });
    },
    ceks(){
        console.log(this.item)
    }
  }
};
</script>