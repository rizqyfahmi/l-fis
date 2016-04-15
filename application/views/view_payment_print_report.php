<html>
    <?php include 'view_head.php'; ?>  
    <style type="text/css">
        @page { margin: 0; }
    </style>
    <body onload="window.print();">
        <div class="wrapper">
            <!-- Main content -->
            <?php for($i=0;$i<3;$i++){?>
            <section class="invoice" style="padding:30px;">
                <!-- title row -->
                <div class="row" style="margin-bottom: 8px;">
                    <div class="col-xs-12">
                        <img src="<?php echo base_url(); ?>assets/dist/img/logo.gif" class="logo" style="width:80px; display: block; margin-left: auto; margin-right: auto;" alt="User Image"/>
                        <center style="font-size: 10px;">
                            Yayasan Pendidikan dan Pengajaran <br/>
                            "Mathla'ul Anwar" Pesantren Palgenep <br/>
                            Terusan Jl. Kopo 302 Margahayu - Bandung <br/>
                            Telp. 54505580 - 5415267 - 5423612 - 5434045
                        </center>
                    </div><!-- /.col -->
                </div>
                <!-- info row -->               
                    
                <!-- Table row -->
                <div class="row">
                    <div class="col-xs-12 table-responsive">
                        <div class="table-responsive">
                            <table class="table" style="font-size: 8px;">
                                <tr>
                                    <th style="width:30%">No.</th>
                                    <td><?php echo $payment_id;?></td>
                                </tr>
                                <tr>
                                    <th>Sudah diterima dari</th>
                                    <td><?php echo $name;?></td>
                                </tr>                                
                                <tr>
                                    <th>Uang sebanyak</th>
                                    <td class="payment_total"><?php echo $payment_total;?></td>
                                </tr>
                                <tr>
                                    <th>Guna membayar</th>
                                    <td><?php echo $payment_type_detail;?></td>
                                </tr>
                                <tr>
                                    <th>Terbilang</th>
                                    <td class="said"><?php echo $payment_total;?></td>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td></td>
                                </tr>
                            </table>
                        </div>
                    </div><!-- /.col -->
                    <div class="col-xs-8" style="font-size: 8px;">
                        <i>
                            Catatan:
                            <ul>
                                <li>Pembayaran berikutnya kwitansi ini harus dibawa</li>
                                <li>Uang yang sudah masuk tidak bisa dikembalikan.</li>
                            </ul>
                                
                        </i>
                    </div>
                    <div class="col-xs-4" style="font-size: 8px; padding-right:30px;">
                        <div class="row" style="border-bottom: 1px solid #f3f3f3">
                            <?php echo $payment_date_extracted;?>
                        </div>
                        <div class="row" style="margin-top:20px; margin-bottom: 50px; text-align: center">
                            Penerima,
                        </div>
                        <div class="row" style="border-bottom: 1px solid #f3f3f3; text-align: center">
                            <?php // echo $name;?>
                            Admin
                        </div>
                            
                    </div>
                </div><!-- /.row -->            
            </section><!-- /.content -->   
            <?php } ?>
        </div><!-- ./wrapper -->
            
        <!-- AdminLTE App -->
        <!--script src="../../dist/js/app.min.js"></script-->
       <?php include 'view_footer.php'; ?>
        <script type="text/javascript" src="<?php echo base_url(); ?>assets/dist/js/native.js"></script>
    </body>
</html>