import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const playlists = [
  {
    title: "Shpjegimi i 'Rijadu Salihin ~ Kopshti i të devotshmëve'",
    youtubePlaylistId: "PLRfpVxC-pSfZJzS3laI6ofmZNklVl3NXt",
    videos: [
      { title: "01. Hyrje dhe fragmente nga jeta e autorit", videoId: "6gkG9YEUHxE" },
    ],
  },
  {
    title: "Kapitulli i Zekatit",
    youtubePlaylistId: "PLRfpVxC-pSfbybTZ2-AiEo1kK3AuhID-p",
    videos: [
      { title: "01. Rëndësia e zekatit dhe dënimi për mosdhënësin e tij", videoId: "CZbUQOy2eyI" },
      { title: "02. Kur obligohet dhënia e zekatit?", videoId: "sOUZxg55OKE" },
      { title: "03. Zekati i arit, argjendit, parave dhe pagës mujore", videoId: "IAKp8W6Ywqs" },
      { title: "04. Zekati i bagëtive", videoId: "Kd32WOtt6vc" },
    ],
  },
  {
    title: "Ligjërata të ndryshme",
    youtubePlaylistId: "PLRfpVxC-pSfYLVzYO00lXXhf8qsyBcvPW",
    videos: [
      { title: "Kopshtet e Xhenetit", videoId: "M2AlhsYmBEQ" },
      { title: "Dituria dhe stabiliteti në kohë fitnesh", videoId: "Ey7AwihaUzc" },
      { title: "Interpretimi modernist i Kuranit dhe i fesë", videoId: "Gavy1KaWIBo" },
      { title: "Meritokracia dhe mohimi i hakut të tjetrit", videoId: "fvrbnoc8JkQ" },
      { title: "Përulja në namaz në kohën e shpërqendrimit", videoId: "aqUVoHWIN6g" },
      { title: "Si t'i përmirësojmë gabimet e të tjerëve?", videoId: "7nlrjoGB6uQ" },
      { title: "Dezinformatat dhe verifikimi i lajmeve", videoId: "lPAEWyJNqWQ" },
      { title: "Mënyrat e interpretimit të Kuranit", videoId: "Gt_Y264puJI" },
      { title: "Pse Allahu i sprovon njerëzit dhe si ti tejkalojmë ato?", videoId: "2kb-w54Gi6A" },
      { title: "Devijimi pas udhëzimit", videoId: "I_bDe5N86UY" },
      { title: "Kë duhet ta pyesim për çështjet fetare?", videoId: "F71YkgZ5Nk0" },
      { title: "Faktorët e stabilitetit në fe", videoId: "L07QMMsEAKg" },
    ],
  },
  {
    title: "Shkaqet e divergjencës në mes dijetarëve",
    youtubePlaylistId: "PLRfpVxC-pSfa3crEIFIffIITRsyMaWx42",
    videos: [
      { title: "01. Divergjenca në mendime si ligj kosmologjik", videoId: "7urutq9m2JE" },
      { title: "02. Dobësimi i muslimanëve si pasojë e përçarjes", videoId: "GNtaK6latlc" },
      { title: "03. Shkaqet e mospajtimit në mes dijetarëve (I)", videoId: "UnwModXVdbo" },
      { title: "04. Shkaqet e mospajtimit në mes dijetarëve (II)", videoId: "V_5QAxfm7Ug" },
      { title: "05. Shkaqet e mospajtimit në mes dijetarëve (III)", videoId: "ogzT1QCWG68" },
      { title: "06. Qëndrimi i muslimanit ndaj mospajtimeve në mes dijetarëve", videoId: "p6a4ViGPfrc" },
      { title: "07. Etika e mospajtimit tek gjeneratat e para", videoId: "cET5wLym9xw" },
      { title: "08. Mospajtimet në akide dhe mospajtimet që bien ndesh me ixhmain", videoId: "AcYGDL6p7mg" },
    ],
  },
  {
    title: "Kapitulli i fikhut të pastërtisë",
    youtubePlaylistId: "PLRfpVxC-pSfbH4SLKBzcn8vS0QI7UECdz",
    videos: [
      { title: "01. Rëndësia e fikhut, kuptimi i tij fetarisht, disa veçori të fikhut islam", videoId: "m5KX11mMEfE" },
      { title: "02. Kuptimi i disa termeve (farz, vaxhib, etj) shkaqet e mospajtimit ndërmjet dijetarëve", videoId: "c2I2X2qZ44Q" },
      { title: "03. Kuptimi i pastërtisë, urtësia pas legjitimimit të pastërtisë në Islam", videoId: "f-ejc71EGsQ" },
      { title: "04. Dispozitat rreth ujërave që lejohet pastrimi dhe marrja e abdesit me to", videoId: "0eJPvdcrQLc" },
      { title: "05. Enët e lejuara për pastrim dhe përdorim", videoId: "Kda9HlilsB0" },
      { title: "06. Rregullat e hyrjes në banjo (I)", videoId: "rBW2GbKQ6Oc" },
      { title: "07. Rregullat e hyrjes në banjo (II)", videoId: "dywTFtIsGtw" },
      { title: "08. Pastrimi me letër higjienike dhe të ngjashme", videoId: "bwqvceeHImI" },
      { title: "09. Farzet dhe sunetet e abdesit (I)", videoId: "BU7jhqD_XP8" },
      { title: "10. Farzet dhe sunetet e abdesit (II)", videoId: "k60EeoqQMFY" },
      { title: "11. Renditja, kontinuiteti dhe nijeti në abdes", videoId: "7c1bnJj2MDw" },
      { title: "12. Thënia Bismilah në fillim të abdesit dhe sunete të tjera", videoId: "qvlN5K5mxes" },
      { title: "13. Mes'hu mbi meste dhe çorapë (I)", videoId: "R5e7JqloaDE" },
      { title: "14. Kushtet për dhënien mes'h mesteve dhe çorapëve", videoId: "4plaRq-kqfs" },
      { title: "15. Mes'hu mbi gjips, fashë dhe çështje të tjera", videoId: "EoiYvirrrrg" },
      { title: "16. Gjërat që e prishin abdesin", videoId: "JSXWgpSHHk4" },
      { title: "17. A e prish abdesin të vjellurit, prekja e femrës me epsh, prekja e organit gjenital, etj?", videoId: "qxbn3vmJPsY" },
      { title: "18. Kur obligohet gusli?", videoId: "hICCo4CIrtA" },
      { title: "19. Si merret gusli dhe çështje të tjera?", videoId: "TNPhFkBlunQ" },
      { title: "20. Kur lejohet marrja e tejemumit?", videoId: "Dgi9Q-mQrDI" },
      { title: "21. A lejohet marrja e tejemumit me gur dhe rërë dhe çka e prish tejemumin?", videoId: "U2x5AycFpSA" },
      { title: "22. Çka konsiderohet ndytësirë dhe llojet e tyre?", videoId: "xEUPMSUxoSY" },
      { title: "23. Mënjanimi i ndytësirave", videoId: "Y8qJDQhsKn0" },
      { title: "24. Papastërtia e disa sekrecioneve të njerëzve", videoId: "mumx9f87vjw" },
      { title: "25. Norma bazike rreth menstruacioneve", videoId: "jVf83VViYsc" },
      { title: "26. Çka i lejohet e çka i ndalohet femrës me menstruacione?", videoId: "C5gCpyBRIfQ" },
      { title: "27. Gjendjet e femrës gjatë ciklit menstrual, lehonia", videoId: "NVT_0CcVFqM" },
    ],
  },
  {
    title: "Kapitulli i Fikhut të agjërimit",
    youtubePlaylistId: "PLRfpVxC-pSfZ2io0YecxQvyKWfYenOUya",
    videos: [
      { title: "01. Hyrje, dispozitat që lidhen me agimin e mëngjesit dhe perëndimin e diellit", videoId: "5vQqS3Vap_s" },
      { title: "02. Llojet e agjërimit, shenjat e arritjes së pubertetit", videoId: "2lN_MSOnfm0" },
      { title: "03. Dispozitat që lidhen me çmendurinë, fjetjen, humbjen e vetëdijes dhe sëmundjen", videoId: "hPgkqY9W5Do" },
      { title: "04. Dispozitat për plakun, udhëtarin, femrën me cikël menstrual dhe lehonën", videoId: "T07wlhwtd6s" },
      { title: "05. Normat për shtatzënën, gjidhënësen dhe dy grupe të tjera njerëzish", videoId: "2ixMBFnzGKg" },
      { title: "06. Kur duhet bërë nijeti dhe a obligohemi ta bëjmë nijetin për çdo ditë të Ramazanit", videoId: "yBFvBHN5H6w" },
      { title: "07. A e prish agjërimin vjellja, hixhameja, dhënia e gjakut dhe masturbimi?", videoId: "DSi6ayLal5s" },
      { title: "08. Paqëllimshmëria, harresa, imponimi dhe padituria si arsye për mosprishjen e agjërimit", videoId: "3BOO2Ubr9ZQ" },
      { title: "09. Normat që kanë të bëjnë me marrëdhëniet intime gjatë ditëve të Ramazanit", videoId: "PzXm9d_urM4" },
      { title: "10. Agjërimi kaza, disa mekruhe dhe mustehabe të agjërimit", videoId: "ro8SwExJqrw" },
      { title: "11. A e prish agjërimin mjekimi i dhëmbëve, anestezioni, gastroskopia, pompa e astmës, inhalimi?", videoId: "uv794-4MWjM" },
      { title: "12. Normat fetare në lidhje me injeksionet, dializën, pikat në vesh e sy, etj, gjatë Ramazanit", videoId: "NqZHaahcecI" },
    ],
  },
  {
    title: "Biografia e eruditëve të Hadithit",
    youtubePlaylistId: "PLRfpVxC-pSfa1RYGQtOVudmI9Rb0pkevy",
    videos: [
      { title: "01. Prejardhja, lindja dhe familja e tij (Biografia e Buhariut)", videoId: "8-BO2reXB8I" },
      { title: "02. Fëmijëria dhe udhëtimet për kërkimin e diturisë (Biografia e Buhariut)", videoId: "E65CAYG5_5U" },
      { title: "03. Ibadeti, morali dhe asketizmi i tij (Biografia e Buhariut)", videoId: "s6FBkkYO04s" },
      { title: "04. Kujtesa e fortë dhe gjenaliteti i rrallë (Biografia e Buhariut)", videoId: "h30ouGZLkfw" },
      { title: "05. Sprova në Nejsabur (Biografia e Buhariut)", videoId: "kl-S5K0BArs" },
      { title: "06. Sprova në Buhara dhe vdekja e tij (Biografia e Buhariut)", videoId: "LZImEe9YeN4" },
      { title: "07. Motivi i përpilimit të 'Sahih el Buhari'", videoId: "JHXrleETBbc" },
      { title: "08. Mprehtësia dhe preciziteti në përpilimin e kapitujve në 'Sahih el Buhari'", videoId: "8WzyIrEaO4M" },
      { title: "09. Çfarë kritere përdori Buhariu për vendosjen e haditheve në Sahihun e tij", videoId: "NUr1xYiANPQ" },
      { title: "10. Hadithi Mualek në Sahih el Buhari", videoId: "_HQ5TmyW5e8" },
      { title: "11. Kontributi i pashembullt për disiplinat e larmishme", videoId: "FmW05-W4b7s" },
      { title: "12. Vlerësimet superlative nga kritikët mendjehollë", videoId: "V57gT-q3elg" },
      { title: "13. Flakja e dyshimeve të hedhura kundër Buhariut dhe Sahihut të tij", videoId: "pDb-IKKXX44" },
      { title: "14. Pse t'i besojmë hadithet e Buhariut ndërkohë ai ishte njeri sikurse të tjerët", videoId: "D8cxoA_9KXU" },
      { title: "15. A ka transmetues të dobët në Sahihun e Buhariut?", videoId: "BUSpVzknWQg" },
      { title: "16. Emri, prejardhja, familja, profesioni i tij dhe përshkrimi fizik (Biografia e Muslimit)", videoId: "NdnEf7BmfnI" },
      { title: "17. Kërkimi i diturisë, udhëtimet, pozita e tij tek dijetarët dhe vlerësimet e tyre për të", videoId: "7gHWioD7of0" },
      { title: "18. Marrja e diturisë nga dijetarët mbron nga lajthitja dhe keqkuptimi i fesë", videoId: "ONbdqXc4x2I" },
      { title: "19. Tematikat që përmban Sahihu i Muslimit, motivi i përpilimit dhe kohëzgjatja e tij", videoId: "v4CvLqCNCUk" },
      { title: "20. Pse disa e favorizuan Sahihun e Muslimit", videoId: "UUf6-SRZNWo" },
      { title: "21. Emri, prejardhja, familja, fëmijëria dhe udhëtimet e tij (Biografia e Ebu Davudit)", videoId: "YUIVsY-FtGE" },
      { title: "22. Ebu Davudi, mësuesit dhe nxënësit e tij, pozita e tij shkencore tek dijetarët", videoId: "vekX9uLJOVc" },
      { title: "23. Tematikat që përmban Suneni i Ebu Davudit, numri i haditheve dhe pozita e tij tek dijetarët", videoId: "8TbxYECgK68" },
      { title: "24. A ka hadithe të dobëta në Sunenin e Ebu Davudit?", videoId: "q_uIi9EdbUY" },
      { title: "25. Emri, prejardhja, udhëtimet, kujtesa e fortë, ibadeti dhe asketizmi i tij (Imam Tirmidhiu)", videoId: "xwCEyM0ZmXQ" },
      { title: "26. Karakteristikat me të cilat veçohet libri i Tirmidhiut nga koleksionet e tjera", videoId: "iW1lpQ8TpGw" },
      { title: "27. Çfarë nënkupton Tirmidhiu me fjalët Hasen dhe Hasen Sahih rreth një hadithi", videoId: "-WRPs3lSN1Q" },
      { title: "28. Biografia e Imam Ibn Maxhe", videoId: "EwCxgoBVdLM" },
      { title: "29. Karakteristikat e Sunenit të Ibn Maxhes, pozita e tij dhe grada e haditheve që përmban ai", videoId: "XsFmMgjOUh0" },
      { title: "30. Biografia e Imam Nesaiut", videoId: "Wyl1YU3pFp8" },
      { title: "31. A është libri Sunen përpilim i Imam Nesaiut apo i nxënësit të tij", videoId: "vhxd7BKQX2s" },
    ],
  },
  {
    title: "Pozita e Sunetit në Islam dhe historiku i Hadithit",
    youtubePlaylistId: "PLRfpVxC-pSfYjdDyumqHO42GnKu6pnD12",
    videos: [
      { title: "01. Pozita e Sunetit në Islam", videoId: "nHTYfrCbWZk" },
      { title: "02. Pagabueshmëria e të Dërguarit të Allahut", videoId: "ad68HnuH8Ec" },
      { title: "03. Largimi nga Suneti e zbeh dashurinë për Profetin ﷺ", videoId: "DuK_1q1VM5Q" },
      { title: "04. Bindja ndaj Profetit ﷺ lumturi në këtë botë", videoId: "GkF4rj4kIBg" },
      { title: "05. Nderimi i Profetit ﷺ tek selefët", videoId: "-LrLaxy8kFA" },
      { title: "06. Shkrimi i hadithit dhe tubimi i tij", videoId: "RvFR8_Knhh8" },
      { title: "07. Udhëtimi për kërkimin e haditheve", videoId: "GfExujESzmE" },
      { title: "08. Isnadi dhe verifikimi i haditheve", videoId: "LTxrL8NKne4" },
      { title: "09. Kritika ndaj transmetuesve dhe zbulimi i gënjeshtarëve", videoId: "L5rhYupYeNk" },
      { title: "10. Metodat e ndjekura për vlerësimin e transmetuesve", videoId: "SgMFgvx8Sfo" },
      { title: "11. Sahabet - Transmetuesit e parë të hadithit", videoId: "ktAUY-XRroE" },
      { title: "12. Metodat e ndjekura për vërtetimin se dikush është sahabi", videoId: "76aJ6ZPAZMY" },
      { title: "13. Ebu Hurejra dhe dilemat rreth tij (pjesa e parë)", videoId: "jEGSSHaAowE" },
      { title: "14. Ebu Hurejra dhe dilemat rreth tij (pjesa e dytë)", videoId: "looMvdq2NnU" },
      { title: "15. A është Suneti shpallje nga Allahu?", videoId: "fxo_HPn07qA" },
      { title: "16. Pozita e Sunetit në raport me Kuranin", videoId: "xJtbuV_fHXU" },
      { title: "17. Kuranistët - Mohuesit e Sunetit", videoId: "b5xb5nZG_ls" },
      { title: "18. Replikë ndaj mohuesve të Sunetit", videoId: "iiUy6gfHhCQ" },
      { title: "19. A na mjafton vetëm Kurani dhe a është ruajtur Suneti", videoId: "KGKQ_ztxMSw" },
      { title: "20. Kundërshtimi i Sunetit me logjikë (mendje)", videoId: "UCbpBBjMXHk" },
      { title: "21. Refuzimi i haditheve Ahad", videoId: "PG2FQp-itqo" },
      { title: "22. Disa dilema rreth vlefshmërisë së argumentimit me hadithet ahad", videoId: "iIF9lSYlaqk" },
      { title: "23. Trillimi i haditheve", videoId: "elzsQ-qZSgc" },
      { title: "24. A janë ngatërruar hadithet e vërteta me hadithet e trilluara", videoId: "GS-i258BUUI" },
      { title: "25. A janë sahabët të besueshëm në fe dhe në transmetim të haditheve", videoId: "sksckn_udik" },
      { title: "26. A janë sahabët të besueshëm në fe dhe në transmetim të haditheve? (II)", videoId: "ufAFFlGW7jg" },
    ],
  },
  {
    title: "Koment i Akides së Tahaviut",
    youtubePlaylistId: "PLRfpVxC-pSfYqiupDJH2oju4ndHjOh1nh",
    videos: [
      { title: "01. Prezantim i përgjithshëm i Akides", videoId: "C59gxyO2TcI" },
      { title: "02. Biografia e Imam Tahaviut dhe vargjet e para të librit", videoId: "pym86V0UpMI" },
      { title: "03. Asgjë nuk është e pamundur për Të (Allahun)", videoId: "06Mxr3qJ_hI" },
      { title: "04. Nuk ndodh diçka tjetër përveç të asaj që Ai dëshiron", videoId: "XVa-I3YHa9A" },
      { title: "05. Krijesat nuk i ngjajnë Atij", videoId: "u66EoxAWFts" },
      { title: "06. Ai i ka krijuar krijesat me diturinë e Tij", videoId: "uhctjn3wzCQ" },
      { title: "07. Besojmë se Muhamedi ﷺ është robi i Tij i zgjedhur, profeti i Tij i dalluar", videoId: "RwXC7JbjFHQ" },
      { title: "08. Muhamedi ﷺ ështe vula e profetëve, zotëria i të dërguarve", videoId: "O9WsjgFOJQE" },
      { title: "09. Kur'ani është Fjala e Allahut", videoId: "sUBg2MN1U1k" },
      { title: "10. Shikimi i Allahut", videoId: "4fRHZQ0qLkA" },
      { title: "11. Çka është Tevili dhe cilat janë llojet e tij", videoId: "yjTVugn9H6U" },
      { title: "12. Besojmë se Miraxhi është i vërtetë", videoId: "gmR05TOt3v0" },
      { title: "13. Besojmë se 'Haudi' është i vërtetë", videoId: "M_evL-40amY" },
      { title: "14. Besojmë se ndërmjetësimi që Profeti (ﷺ) për besimtarët është i vërtetë", videoId: "Jn4M88U9lzs" },
      { title: "15. Besa që mori Allahu nga Ademi dhe pasardhësit e tij", videoId: "38iLEENa3UA" },
      { title: "16. Allahu e ka ditur numrin e atyre që do të përfundojnë në Xhenet apo Xhehenem", videoId: "OUr_J8cm5tg" },
      { title: "17. Besojmë në Leuhi Mahfudh dhe në Lapsin (e parë)", videoId: "ccn3qECZ43g" },
      { title: "18. Besojmë se Arshi dhe Kursija janë të vertetë", videoId: "BvqLcvVbX9Q" },
      { title: "19. Ai (Allahu) ka përfshirë çdo gjë dhe është mbi Arsh", videoId: "WoQdLkU8h1I" },
      { title: "20. Allahu e zgjodhi Ibrahimin si 'Halil' dhe Musait i foli me të folur", videoId: "zo0n8yJuZH4" },
      { title: "21. Besojmë në engjëjt, profetët dhe librat që u janë zbritur", videoId: "UuXsxPNcrEY" },
      { title: "22. Ata që i drejtohen Kibles tonë i emërtojmë musliman", videoId: "Qx4QNh_u2ac" },
      { title: "23. Nuk polemizojmë në lidhje me Kuranin", videoId: "MEgnCd-8ScI" },
      { title: "24. Nuk e konsiderojmë kafir atë që bënë mëkate", videoId: "gjKXYaGseuI" },
      { title: "25. Ne nuk themi se gjynahu i vepruar nuk e dëmton besimin", videoId: "hgJW6eZ7brU" },
      { title: "26. Rreziku i marrjes me temën e 'tekfirit' pa dituri", videoId: "Yyl-sSBnUtw" },
      { title: "27. Shpresojmë që muslimanët që bëjnë vepra të mira të futen në Xhenet", videoId: "iyp2jDFLmRY" },
      { title: "28. Besimtari i vërtetë jeton mes frikës dhe shpresës", videoId: "FfTh7KuBe1o" },
      { title: "29. Kuptimi i imanit ne aspektin gjuhesor dhe sheriatik", videoId: "2hnjoiT2Mpg" },
      { title: "30. Realiteti i Imanit tek Ehli Suneti", videoId: "LDKtVKH2-I0" },
      { title: "31. Çdo gjë që është saktësuar nga Sheriati i Profetit ﷺ është e vërtetë", videoId: "_azk0ACTp90" },
      { title: "32. Imani shtohet dhe pakësohet", videoId: "y9lRqCka65k" },
      { title: "33. Të gjithë besimtarët janë evlija të Rrahmanit", videoId: "OwAC8OgU8XU" },
      { title: "34. Mëkatarët e mëdhenjë nuk do të jenë përjetësisht në Xhehnem", videoId: "LOKE0lxWFdA" },
      { title: "35. Nuk themi për dikë në mënyrë specifike është në Xhenet apo Xhehnem", videoId: "_zCN4QgxiwI" },
      { title: "36. Nuk lejohet rebelimi kundër prijësit musliman", videoId: "KxdKDbA77JE" },
      { title: "37. I shmangemi i veçimit, kundërshtimit dhe përçarjes", videoId: "OFxDDi-dwNs" },
      { title: "38. Besojmë në ekzistencën e engjëllit të vdekjës", videoId: "0eq-jbaiTGc" },
      { title: "39. Varri do të jetë kopsht nga kopshtet e Xhenetit ose gropë nga gropat e Zjarrit", videoId: "hy8syfTV2uk" },
      { title: "40. Besojmë në ringjalljen dhe ndodhitë pas saj", videoId: "P3e58vtcNpQ" },
      { title: "41. Xheneti dhe Zjarri janë të krijuara, nuk zhduken kurrë dhe nuk njohin mbarim", videoId: "ewomh2-6DK8" },
      { title: "42. Besojmë se Allahu e ka krijuar Xhenetin dhe Zjarrin para krijimit të njerëzve", videoId: "GrJXX3hl1Uk" },
      { title: "43. Allahu nuk e ngarkon askënd përtej mundësive të tij", videoId: "XYIE6eBsSGY" },
      { title: "44. Veprat e njerëzve janë të krijuara nga Allahu", videoId: "1gR9_81RZao" },
      { title: "45. Çdo gjë ndodh me dëshirën e Allahut, diturinë e Tij, kadanë dhe kaderin e Tij", videoId: "bSlbXpEFHXk" },
      { title: "46. Allahu u përgjigjet lutjeve dhe i realizon nevojat e robërve", videoId: "-DbyicIjv8I" },
      { title: "47. I duam shokët e Profetit ﷺ", videoId: "57Az0hJgPzY" },
      { title: "48. Ne i përmendim sahabet vetëm me të mira", videoId: "uV1s5vCVqKg" },
      { title: "49. Kushdo që flet keq për dijetarët është jashtë rrugës së drejtë", videoId: "t6mcL4hQMmA" },
      { title: "50. Nuk besojmë se ndonjë nga evlijatë ka më shumë përparësi dhe pozitë se sa ndonjëri nga profetët", videoId: "aO8iOWoMOvA" },
      { title: "51. Nuk i besojmë fallxhorëve dhe parashikuesve të së ardhmes", videoId: "bt9PjU9-skM" },
      { title: "52. Ne i përmbahemi xhematit ndërsa përçarja është denim dhe devijim", videoId: "m8eBff9sISU" },
      { title: "53. Kjo është feja jonë dhe besimi ynë i brendshëm dhe i jashtëm", videoId: "lZ4-ldrSOAg" },
    ],
  },
];

async function main() {
  console.log("🗑️  Fshirja e playlistave dhe leksioneve të vjetra...");

  // Delete all existing lectures and playlists
  await prisma.lecture.deleteMany({});
  await prisma.playlist.deleteMany({});

  console.log("✅ Të dhënat e vjetra u fshinë");

  let totalVideos = 0;

  for (const pl of playlists) {
    const firstVideoId = pl.videos[0]?.videoId;
    const thumbnail = firstVideoId
      ? `https://img.youtube.com/vi/${firstVideoId}/maxresdefault.jpg`
      : null;

    const playlist = await prisma.playlist.create({
      data: {
        title: pl.title,
        youtubePlaylistId: pl.youtubePlaylistId,
        thumbnail,
        lectures: {
          create: pl.videos.map((v, i) => ({
            title: v.title,
            youtubeUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
            youtubeId: v.videoId,
            thumbnail: `https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`,
            order: i + 1,
          })),
        },
      },
    });

    totalVideos += pl.videos.length;
    console.log(
      `📋 ${playlist.title} — ${pl.videos.length} video`
    );
  }

  console.log(`\n✅ U importuan ${playlists.length} playlista me ${totalVideos} video gjithsej!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
