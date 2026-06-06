# Mobilpublicering av nyheter

Adminpanelen finns på:

```text
/admin/makro
```

För lokal utveckling används lösenordet:

```text
utdelning-admin
```

För live-publicering på Vercel krävs två miljövariabler:

```text
MAKRO_ADMIN_PASSWORD=ett-langt-eget-losenord
BLOB_READ_WRITE_TOKEN=token-fran-vercel-blob
```

`BLOB_READ_WRITE_TOKEN` kan komma från din private Blob Store. Nyhetstexten
sparas i `makro/posts.json` och uppladdade bilder sparas i `makro/images/`.
Bilderna visas publikt via `/api/news-image/...`, så du behöver ingen separat
public Blob Store.

Telefonbilder komprimeras i webbläsaren innan uppladdning. Om en bild ändå är
för stor behöver den beskäras eller sparas i mindre storlek innan publicering.
