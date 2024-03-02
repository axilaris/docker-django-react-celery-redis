# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class TblAxleData(models.Model):
    site_id = models.CharField(max_length=-1)
    vdata_id = models.BigIntegerField()
    axle_id = models.BigIntegerField()
    group_id = models.IntegerField(blank=True, null=True)
    axle_weight = models.FloatField(blank=True, null=True)
    distance = models.FloatField(blank=True, null=True)
    start_time = models.DateTimeField()
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_axle_data'


class TblAxleOverload(models.Model):
    site_id = models.CharField(primary_key=True, max_length=-1)
    vdata_id = models.BigIntegerField()
    group_id = models.IntegerField()
    axle_index = models.IntegerField()
    axle_count = models.IntegerField(blank=True, null=True)
    axle_spread = models.FloatField(blank=True, null=True)
    group_weight = models.FloatField(blank=True, null=True)
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_axle_overload'
        unique_together = (('site_id', 'vdata_id', 'group_id', 'axle_index'),)


class TblCsvGen(models.Model):
    data_ts = models.DateTimeField(primary_key=True)
    gen_ts = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'tbl_csv_gen'


class TblLosData(models.Model):
    route_id = models.IntegerField(primary_key=True)
    hourdate = models.DateTimeField()
    hv_count = models.IntegerField()
    pcu_sum = models.FloatField()
    var_total = models.IntegerField()
    var_pc = models.FloatField()
    var_c = models.FloatField()
    var_t = models.FloatField()
    vcr = models.FloatField()
    rating = models.CharField(max_length=1)
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_los_data'
        unique_together = (('route_id', 'hourdate'),)


class TblLosRoute(models.Model):
    route_id = models.IntegerField(primary_key=True)
    route_name = models.CharField(max_length=10, blank=True, null=True)
    bound = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_los_route'


class TblSites(models.Model):
    id = models.IntegerField(primary_key=True)
    site_id = models.CharField(max_length=-1, blank=True, null=True)
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_sites'


class TblUsers(models.Model):
    user_name = models.CharField(max_length=12)
    password = models.CharField(max_length=12)
    role = models.IntegerField()
    email = models.CharField(max_length=-1, blank=True, null=True)
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_users'


class TblVehicleData(models.Model):
    site_id = models.CharField(max_length=25)
    lane_no = models.IntegerField(blank=True, null=True)
    vdata_id = models.BigIntegerField()
    metrological_id = models.CharField(max_length=25, blank=True, null=True)
    lane_name = models.CharField(max_length=25, blank=True, null=True)
    error_flag = models.IntegerField(blank=True, null=True)
    warning_flag = models.IntegerField(blank=True, null=True)
    direction = models.IntegerField(blank=True, null=True)
    duration = models.FloatField(blank=True, null=True)
    vehicle_length = models.FloatField(blank=True, null=True)
    gross_weight = models.FloatField(blank=True, null=True)
    velocity = models.FloatField(blank=True, null=True)
    wheel_base = models.FloatField(blank=True, null=True)
    axles_count = models.IntegerField(blank=True, null=True)
    mass_unit = models.CharField(max_length=25, blank=True, null=True)
    velocity_unit = models.CharField(max_length=25, blank=True, null=True)
    distance_unit = models.CharField(max_length=25, blank=True, null=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)
    time_sync_status = models.CharField(max_length=25, blank=True, null=True)
    vehicle_class = models.IntegerField(blank=True, null=True)
    vehicle_pcu = models.FloatField(blank=True, null=True)
    is_overload = models.BooleanField(blank=True, null=True)
    hs_flag = models.BooleanField(blank=True, null=True)
    ds_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tbl_vehicle_data'
