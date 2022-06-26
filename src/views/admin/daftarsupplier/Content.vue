<template>
    <div>
        <v-btn color="primary" to="/admin/daftarpembeli/add">
            <v-icon>add</v-icon>
            Tambah Supplier
        </v-btn>
        <br/><br/>
        <div>
        <data-table :headers='headers' :items='datas' :search.sync='cari'>
            <template slot="field" slot-scope="props" height="300px" width="500px">
                <td class="text-md-left">{{ props.props.item.nama_supplier }}</td>
                <td class="text-md-left">{{ props.props.item.alamat }}</td>
                <td class="text-md-left">{{ props.props.item.no_hp }}</td>
                <td class="text-md-left">{{ props.props.item.jenis_kelamin }}</td>
                <td class="text-md-left">{{ props.props.item.tanggal_lahir}}</td>
                <td>
                   <v-tooltip left>
                        <v-btn fab dark small color="cyan" slot="activator"
                        :to='"/admin/daftarsupplier/"+props.props.item.id+"/edit"'>
                            <v-icon small dark>edit</v-icon>
                        </v-btn>
                        <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip right>
                        <v-btn fab dark small color="red" slot="activator" @click="del(props.props.item)">
                            <v-icon small dark>delete</v-icon>
                        </v-btn>
                        <span>Delete</span>
                    </v-tooltip>
                </td>
            </template>
        </data-table>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>


<script>

import api from '@/common/api.services' 
import pdf from 'vue-pdf'


export default {
  
 data(){
        return{
            cari: '',
            headers: [
                { text: 'Nama Supplier', value: 'Nama Supplier' },
                { text: 'Alamat', value: 'Alamat' },
                { text: 'No HP', value: 'No HP' },
                { text: 'Jenis Kelamin', value: 'Jenis Kelamin' },
                { text: 'Tanggal Lahir', value: 'Tanggal Lahir' },
                { text: 'Aksi', value: 'Aksi' },

            ],
            items:[],
            datas: [],

            breadItems:[
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/admin/dashboard'
                },
                {
                    text: 'DaftarSupplier',
                    disabled: true,
                    href: '/admin/daftarsupplier'
                },
            ]
        }
    },
    created(){
      // api.getApi(`/datacontent/${ this.$auth.getUser()}`)
      api.getApi('/supplier/read.php')
      .then(r=>{
        this.datas = r.data.data
        console.log(r)
      }).catch((e)=>{
        console.log(e)
      })
    },
    components:{
        DataTable : () => import('@/components/admin/DataTable.vue'),
        pdf
    },
    methods:{
         del(val){
        console.log("hapus")
        api.deleteApi('/content',val.id)
        .then(
          this.getAll()
        )
        .catch((ex)=>
          console.log(ex)
        )
      },
      getAll(){
      // api.getApi(`/datacontent/${ this.$auth.getUser()}`)
        api.getApi('/supplier/read.php')
        .then(r=>{
          this.datas = r.data.data
          // this.datas = r.data
          console.log(r)
        }).catch((e)=>{
          console.log(e)
        })
      },
      getPdf(img){
        console.log(img)
        api.getApi('/getPdf?img='+img)
        .then(function(r){
          var url = r.config.url
          console.log(url)
          window.open(url)
        })
      }
    }
}
</script>

<style>
.nameOfTheClass {
   width: 1000px;
   height: 300px;
}

</style>
