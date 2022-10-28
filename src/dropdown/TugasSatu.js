
import React, { useState, useEffect, Component } from "react";
import { Container } from "react-bootstrap";
import axios from 'axios'

function TugasSatu() {
    const [provinsi, setProvinsi]= useState([]);
    const [provinsiid, setProvinsiid]=useState('');
    const [kota_kabupaten, setKota]= useState([]);
    const [kotaid, setKotaid]= useState('');
    const [kecamatan, setKecamatan]= useState([]);
    const [kecamatanid, setKecamatanid] = useState('');

     useEffect( ()=>{
         const getprovinsi= async()=>{
             const resprovinsi= await fetch("http://dev.farizdotid.com/api/daerahindonesia/provinsi");
             const resprov= await resprovinsi.json();
             setProvinsi(await resprov);
         }
         getprovinsi();
     },[]);

     const handleprovinsi=(event)=>{
         const getprovinsiid= event.target.value;
         setProvinsiid(getprovinsiid);
     }

     useEffect( ()=>{
     const getkota= async()=>{
         const reskota= await fetch("http://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi={id_provinsi}");
         const reskot= await reskota.json();
         setKota(await reskot);
     }
    getkota();
     },[provinsiid]);

     const handlekota=(event)=>{
        const getkotaid= event.target.value;
        setKotaid(getkotaid);
    }

useEffect( ()=>{
    const getkecamatan= async()=>{   
        const reskecamatan= await fetch("http://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota={id_kota}");
        const rkecamatan= await reskecamatan.json();
        setKecamatan(await rkecamatan);
    }
getkecamatan();
},[kotaid]);
         
   return (
    <React.Fragment>
      <Container className="content">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="mt-4 mb-4 fw-bold">
              Masukkan Alamat{" "}
            </h2>

            <form className="row g-3">

               <div className="col-md-3">
                <label  className="form-label">Provinsi</label>
                <select name="provinsi" className="form-control p-2"  onChange={(e)=>handleprovinsi(e)} >
                  <option value="">--Pilih Provinsi--</option>
                  {
                 provinsi.map( (getprov, index)=>(
                  <option key={index} value={getprov.id}>{getprov.nama } </option>
                 ))
                  }
                </select>
              </div>

              <div className="col-md-3">
                <label  className="form-label">Kota/Kabupaten</label>
                <select className="form-select" name="kota"  onChange={(e)=>handlekota(e)}>
                  <option value="">--Pilih Kota/Kabupaten--</option>
                  {
                    kota_kabupaten.map( (getkot, index)=>(
                     <option key={index} value={getkot.id}>{getkot.nama } </option>
                    )) 
                  }                  
                </select>
              </div>

              <div className="col-md-3">
                <label  className="form-label">Kecamatan</label>
                <select className="form-select" name="city">
                  <option value="">--Pilih Kecamatan--</option>
                  {
                      kecamatan.map( (getkec, index)=>(
                      <option key={index} value={getkec.id}> { getkec.nama} </option>
                      ))
                  }                 
                </select>
              </div>
              
              <div className="col-md-3">                
                <button type="button" className="btn btn-primary mt-4">Submit</button>
              </div>
            
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default TugasSatu;