<template>
    <div>
        <v-btn color="primary" to="/admin/content/add">
            <v-icon>add</v-icon>
            Tambah Barang Masuk
        </v-btn>
        <br/><br/>
        <div>
        <data-table :headers='headers' :items='datas' :search.sync='cari'>
            <template slot="field" slot-scope="props" height="300px" width="500px">
                <td class="text-md-left">{{ props.props.item.tanggal_masuk }}</td>
                <td class="text-md-left">{{ props.props.item.kuantitas }}</td>
                <td class="text-md-left">{{ props.props.item.nama_supplier }}</td>
                <td class="text-md-left">{{ props.props.item.nama_obat }}</td>
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
                { text: 'Tanggal masuk', value: 'Tanggal masuk' },
                { text: 'Kuantitas', value: 'Kuantitas' },
                { text: 'Penjual', value: 'Penjual' },
                { text: 'Obat', value: 'Obat' },

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
                    text: 'Barangmasuk',
                    disabled: true,
                    href: '/admin/barangmasuk'
                },
            ]
        }
    },
    created(){
      // api.getApi(`/datacontent/${ this.$auth.getUser()}`)
      api.getApi('/barang_masuk/read.php')
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
        api.getApi('/barang_masuk/read.php')
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
