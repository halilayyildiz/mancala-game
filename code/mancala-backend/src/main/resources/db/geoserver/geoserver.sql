select a.*,b.short_name as short_name from Gis_Pipe a left outer join Gis_material b on a.gis_material_id = b.id

select * from GIS_FACILITY WHERE ENUM_FACILITY_TYPE = 'DMA'
