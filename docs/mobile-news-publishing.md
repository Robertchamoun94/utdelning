# Mobilpublicering av nyheter

Adminpanelen finns på:

```text
/admin/makro
```

För lokal utveckling används lösenordet:

```text
utdelning-admin
```

För live-publicering på Vercel krävs tre miljövariabler:

```text
MAKRO_ADMIN_PASSWORD=ett-langt-eget-losenord
BLOB_READ_WRITE_TOKEN=token-fran-private-vercel-blob
BLOB_PUBLIC_READ_WRITE_TOKEN=token-fran-public-vercel-blob
```

`BLOB_READ_WRITE_TOKEN` ska komma från en private Blob Store. Den används för
nyhetstexten som sparas i `makro/posts.json`.

`BLOB_PUBLIC_READ_WRITE_TOKEN` ska komma från en public Blob Store. Den används
för uppladdade nyhetsbilder i `makro/images/`, så bilderna kan visas publikt på
artikelsidorna och läsas av Google/sociala medier.

Vercel låter inte en private Blob Store använda `access: "public"`. Om du får
felet `Cannot use public access on a private store` behöver du skapa en ny Blob
Store med access `Public` och lägga dess read-write token som
`BLOB_PUBLIC_READ_WRITE_TOKEN`.

Telefonbilder komprimeras i webbläsaren innan uppladdning. Om en bild ändå är
för stor behöver den beskäras eller sparas i mindre storlek innan publicering.
