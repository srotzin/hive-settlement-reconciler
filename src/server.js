'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3027;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/reconciler'));
app.get('/',(_,r)=>r.json({service:'hive-settlement-reconciler',version:'1.0.0',description:'Settlement reconciliation — cross-ledger matching, discrepancy detection, auto-correction',endpoints:{"reconcile":"POST /v1/reconciler/reconcile","report":"GET /v1/reconciler/report/:id","stats":"GET /v1/reconciler/stats","records":"GET /v1/reconciler/records","health":"GET /health","pulse":"GET /.well-known/hive-pulse.json"}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-settlement-reconciler] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
