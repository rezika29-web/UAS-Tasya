<template>
    <div>
        <v-btn color="primary" to="/admin/content/add">
            <v-icon>add</v-icon>
            Tambah Stok Obat
        </v-btn>
        <br/><br/>
        <div>
            <!-- <table border="1" border-spacing="50px" width="100%" class="center">
                    
                <tr>
                    <th>Nama Pasien</th>
                    <th>Umur Pasien</th>
                    <th>Jenis Kelamin</th>
                    <th>Alamat Pasien</th>
                    <th>Hewan Yang Menggigit</th>
                    <th>Lokasi Gigitan</th>
                    <th>Tanggal Tergigit</th>
                    <th>Status Hewan</th>
                    <th>Detail Kejadian</th>
                    <th>Jenis Penanggulangan</th>
                    <th>aksi</th>
                </tr>
                <tr v-for="item in datas" 
                :key=item.id
                >
                    <td>{{item.namapasien}}</td>
                    <td>{{item.umur}}</td>
                    <td>{{item.jeniskelamin}}</td>
                    <td>{{item.alamat}}</td>
                    <td>{{item.hewan}}</td>
                    <td>{{item.lokasi}}</td>
                    <td>{{item.tanggaltergigit}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.description}}</td>
                    <td>{{item.aksi}}</td>
                    <td>
                      
                      <btn fab dark small color="red" slot="activator" @click="del(item)">Hapus
                        <icon center dark>delete</icon>
                        </btn>

</td>

                </tr>
            </table> -->
        <data-table :headers='headers' :items='datas' :search.sync='cari'>
            <template slot="field" slot-scope="props" height="300px" width="500px">
                <td class="text-md-left">{{ props.props.item.name }}</td>
                <td class="text-md-left">{{ props.props.item.namapasien }}</td>
                <td class="text-md-left">{{ props.props.item.umur }}</td>
                <td class="text-md-left">{{ props.props.item.jeniskelamin }}</td>
                <td class="text-md-left">{{ props.props.item.alamat }}</td>
                <td class="text-md-left">{{ props.props.item.hewan }}</td>
                <td class="text-md-left">{{ props.props.item.lokasi }}</td>
                <td class="text-md-left">{{ props.props.item.tanggaltergigit }}</td>
                <td class="text-md-left">{{ props.props.item.status }}</td>
                <td class="text-md-left">{{ props.props.item.statushewan }}</td>
                <td class="text-md-left">{{ props.props.item.var }}</td>
                <td class="text-md-left">{{ props.props.item.pernahvar }}</td>
                <!-- <td class="text-md-left">{{ props.props.item.name }}</td> -->
                <td class="text-md-left" >{{ props.props.item.description }}</td>
                <td class="text-md-left">{{ props.props.item.aksi }}</td>
                <td class="text-md-left">{{ props.props.item.keterangan }}</td>
                <td class="text-md-left">{{ props.props.item.diberi }}</td>
                <!-- <td class="text-md-left"><v-btn @click="getPdf(props.props.item.image)">{{ props.props.item.image }}</v-btn></td> -->
                <td class="text-md-left"><v-btn @click="getPdf(props.props.item.balasan)">{{ props.props.item.balasan }}</v-btn></td>
                <td>
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
                {
                    text: 'Judul ',
                    align: 'left',
                    sortable: false,
                    value: 'Judul'
                },
                { text: 'Nama Pasien', value: 'Nama Pasien' },
                { text: 'Umur Pasien', value: 'Umur Pasien' },
                { text: 'Jenis Kelamin', value: 'Jenis Kelamin' },
                { text: 'Alamat Pasien', value: 'Alamat Pasien' },
                { text: 'Hewan Yang Menggigit', value: 'Hewan Yang Menggigit' },
                { text: 'Lokasi Gigitan', value: 'Lokasi Gigitan' },
                { text: 'Tanggal Tergigit', value: 'Tanggal Tergigit' },
                { text: 'Status Hewan', value: 'Status Hewan' },
                { text: 'Keadaan Hewan', value: 'Keadaan Hewan' },
                { text: 'Pernah DiVAR', value: 'Pernah DiVAR' },
                { text: 'Di VAR', value: 'Di VAR' },
                { text: 'Detail Kejadian', value: 'Detail Kejadian', tdClass: 'nameOfTheClass'},
                { text: 'Jenis Penanggualangan', value: 'Jenis Penanggulangan' },
                { text: 'Keterangan', value: 'Keterangan' },
                { text: 'Dinas Kesehatan', value: 'Dinas Kesehatan' },
                { text: 'Surat Balasan', value: 'Surat Balasan' },


                { text: 'Aksi', value: 'Aksi' },

                // { text: 'Surat Rujukan', value: 'Surat Rujukan' },

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
                    text: 'Content',
                    disabled: true,
                    href: '/admin/content'
                },
            ]
        }
    },
    created(){
      api.getApi(`/datacontent/${ this.$auth.getUser()}`)
      .then(r=>{
        this.datas = r.data
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
      api.getApi(`/datacontent/${ this.$auth.getUser()}`)
        // api.getApi('/content')
        .then(r=>{
          // this.datas = r.data.data
          this.datas = r.data
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
