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

`BLOB_READ_WRITE_TOKEN` skapas automatiskt när du kopplar en Vercel Blob Store
till projektet i Vercel. När variabeln finns sparas nyhetstexten i
`makro/posts.json` i Blob och uppladdade bilder i `makro/images/`.

Telefonbilder komprimeras i webbläsaren innan uppladdning. Om en bild ändå är
för stor behöver den beskäras eller sparas i mindre storlek innan publicering.
