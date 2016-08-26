angular.module('app.localization', [])

.factory('SupportedCountries', function(SupportedCurrencies) {
	return {
		"AU": { 
			"name": "Australia",
			"iso_code": "AU",
			"charge_individual_currencies": [],
			"charge_groups": [1],
			"bank_accounts_individual_currencies": [SupportedCurrencies.AUD]
		}, 
		"CA": { 
			"name": "Canada",
			"iso_code": "CA",
			"charge_individual_currencies": [SupportedCurrencies.CAD, SupportedCurrencies.USD],
			"charge_groups": [],
			"bank_accounts_individual_currencies": [SupportedCurrencies.CAD, SupportedCurrencies.USD]
		}, 
		"DK": { 
			"name": "Denmark",
			"iso_code": "DK",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"FI": { 
			"name": "Finland",
			"iso_code": "FI",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"FR": { 
			"name": "France",
			"iso_code": "FR",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"IE": { 
			"name": "Ireland",
			"iso_code": "IE",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"NO": { 
			"name": "Norway",
			"iso_code": "NO",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"SE": { 
			"name": "Sweden",
			"iso_code": "SE",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"GB": { 
			"name": "United Kingdom",
			"iso_code": "GB",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK]
		}, 
		"US": { 
			"name": "United States",
			"iso_code": "US",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.USD]
		}, 
		"AT": { 
			"name": "Austria",
			"iso_code": "AT",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"BE": { 
			"name": "Belgium",
			"iso_code": "BE",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"DE": { 
			"name": "Germany",
			"iso_code": "DE",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"HK": { 
			"name": "Hong Kong",
			"iso_code": "HK",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"IT": { 
			"name": "Italy",
			"iso_code": "IT",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"JP": { 
			"name": "Japan",
			"iso_code": "JP",
			"charge_individual_currencies": [SupportedCurrencies.JPY],
			"charge_groups": [],
			"bank_accounts_individual_currencies": [SupportedCurrencies.JPY]
		}, 
		"LU": { 
			"name": "Luxembourg",
			"iso_code": "LU",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"NL": { 
			"name": "Netherlands",
			"iso_code": "NL",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"PT": { 
			"name": "Portugal",
			"iso_code": "PT",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}, 
		"SG": { 
			"name": "Singapore",
			"iso_code": "SG",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.SGD]
		}, 
		"ES": { 
			"name": "Spain",
			"iso_code": "ES",
			"charge_individual_currencies": [],
			"charge_groups": [1, 2],
			"bank_accounts_individual_currencies": [SupportedCurrencies.EUR, SupportedCurrencies.GBP, SupportedCurrencies.USD, SupportedCurrencies.DKK, SupportedCurrencies.NOK, SupportedCurrencies.SEK]
		}
	};
})

.factory('SupportedCurrencies', function() {
	return {
		"AED": { 
			"currency_group": 1,
			"name": "(AED): United Arab Emirates Dirham",
			"iso_code": "AED",
			"accepts_american_express": true
		},
		"ALL": { 
			"currency_group": 1,
			"name": "(ALL): Albanian Lek",
			"iso_code": "ALL",
			"accepts_american_express": true
		},
		"ANG": { 
			"currency_group": 1,
			"name": "(ANG): Netherlands Antillean Gulden",
			"iso_code": "ANG",
			"accepts_american_express": true
		},
		"ARS": { 
			"currency_group": 1,
			"name": "(ARS): Argentine Peso",
			"iso_code": "ARS",
			"accepts_american_express": false
		},
		"AUD": { 
			"currency_group": 1,
			"name": "(AUD): Australian Dollar",
			"iso_code": "AUD",
			"accepts_american_express": true
		},
		"AWG": { 
			"currency_group": 1,
			"name": "(AWG): Aruban Florin",
			"iso_code": "AWG",
			"accepts_american_express": true
		},
		"BBD": { 
			"currency_group": 1,
			"name": "(BBD): Barbadian Dollar",
			"iso_code": "BBD",
			"accepts_american_express": true
		},
		"BDT": { 
			"currency_group": 1,
			"name": "(BDT): Bangladeshi Taka",
			"iso_code": "BDT",
			"accepts_american_express": true
		},
		"BIF": { 
			"currency_group": 1,
			"name": "(BIF): Burundian Franc",
			"iso_code": "BIF",
			"accepts_american_express": true
		},
		"BMD": { 
			"currency_group": 1,
			"name": "(BMD): Bermudian Dollar",
			"iso_code": "BMD",
			"accepts_american_express": true
		},
		"BND": { 
			"currency_group": 1,
			"name": "(BND): Brunei Dollar",
			"iso_code": "BND",
			"accepts_american_express": true
		},
		"BOB": { 
			"currency_group": 1,
			"name": "(BOB): Bolivian Boliviano",
			"iso_code": "BOB",
			"accepts_american_express": false
		},
		"BRL": { 
			"currency_group": 1,
			"name": "(BRL): Brazilian Real",
			"iso_code": "BRL",
			"accepts_american_express": false
		},
		"BSD": { 
			"currency_group": 1,
			"name": "(BSD): Bahamian Dollar",
			"iso_code": "BSD",
			"accepts_american_express": true
		},
		"BWP": { 
			"currency_group": 1,
			"name": "(BWP): Botswana Pula",
			"iso_code": "BWP",
			"accepts_american_express": true
		},
		"BZD": { 
			"currency_group": 1,
			"name": "(BZD): Belize Dollar",
			"iso_code": "BZD",
			"accepts_american_express": true
		},
		"CAD": { 
			"currency_group": 1,
			"name": "(CAD): Canadian Dollar",
			"iso_code": "CAD",
			"accepts_american_express": true
		},
		"CHF": { 
			"currency_group": 1,
			"name": "(CHF): Swiss Franc",
			"iso_code": "CHF",
			"accepts_american_express": true
		},
		"CLP": { 
			"currency_group": 1,
			"name": "(CLP): Chilean Peso",
			"iso_code": "CLP",
			"accepts_american_express": false
		},
		"CNY": { 
			"currency_group": 1,
			"name": "(CNY): Chinese Renminbi Yuan",
			"iso_code": "CNY",
			"accepts_american_express": true
		},
		"COP": { 
			"currency_group": 1,
			"name": "(COP): Colombian Peso",
			"iso_code": "COP",
			"accepts_american_express": false
		},
		"CRC": { 
			"currency_group": 1,
			"name": "(CRC): Costa Rican Colón",
			"iso_code": "CRC",
			"accepts_american_express": false
		},
		"CVE": { 
			"currency_group": 1,
			"name": "(CVE): Cape Verdean Escudo",
			"iso_code": "CVE",
			"accepts_american_express": false
		},
		"CZK": { 
			"currency_group": 1,
			"name": "(CZK): Czech Koruna",
			"iso_code": "CZK",
			"accepts_american_express": false
		},
		"DJF": { 
			"currency_group": 1,
			"name": "(DJF): Djiboutian Franc",
			"iso_code": "DJF",
			"accepts_american_express": false
		},
		"DKK": { 
			"currency_group": 1,
			"name": "(DKK): Danish Krone",
			"iso_code": "DKK",
			"accepts_american_express": true
		},
		"DOP": { 
			"currency_group": 1,
			"name": "(DOP): Dominican Peso",
			"iso_code": "DOP",
			"accepts_american_express": true
		},
		"DZD": { 
			"currency_group": 1,
			"name": "(DZD): Algerian Dinar",
			"iso_code": "DZD",
			"accepts_american_express": true
		},
		"EGP": { 
			"currency_group": 1,
			"name": "(EGP): Egyptian Pound",
			"iso_code": "EGP",
			"accepts_american_express": true
		},
		"ETB": { 
			"currency_group": 1,
			"name": "(ETB): Ethiopian Birr",
			"iso_code": "ETB",
			"accepts_american_express": true
		},
		"EUR": { 
			"currency_group": 1,
			"name": "(EUR): Euro",
			"iso_code": "EU",
			"accepts_american_express": true
		},
		"FJD": { 
			"currency_group": 1,
			"name": "(FJD): Fijian Dollar",
			"iso_code": "FJD",
			"accepts_american_express": true
		},
		"FKP": { 
			"currency_group": 1,
			"name": "(FKP): Falkland Islands Pound",
			"iso_code": "FKP",
			"accepts_american_express": false
		},
		"GBP": { 
			"currency_group": 1,
			"name": "(GBP): British Pound",
			"iso_code": "GBP",
			"accepts_american_express": true
		},
		"GIP": { 
			"currency_group": 1,
			"name": "(GIP): Gibraltar Pound",
			"iso_code": "GIP",
			"accepts_american_express": true
		},
		"GMD": { 
			"currency_group": 1,
			"name": "(GMD): Gambian Dalasi",
			"iso_code": "GMD",
			"accepts_american_express": true
		},
		"GNF": { 
			"currency_group": 1,
			"name": "(GNF): Guinean Franc",
			"iso_code": "GNF",
			"accepts_american_express": false
		},
		"GTQ": { 
			"currency_group": 1,
			"name": "(GTQ): Guatemalan Quetzal",
			"iso_code": "GTQ",
			"accepts_american_express": false
		},
		"GYD": { 
			"currency_group": 1,
			"name": "(GYD): Guyanese Dollar",
			"iso_code": "GYD",
			"accepts_american_express": true
		},
		"HKD": { 
			"currency_group": 1,
			"name": "(HKD): Hong Kong Dollar",
			"iso_code": "HKD",
			"accepts_american_express": true
		},
		"HNL": { 
			"currency_group": 1,
			"name": "(HNL): Honduran Lempira",
			"iso_code": "HNL",
			"accepts_american_express": false
		},
		"HRK": { 
			"currency_group": 1,
			"name": "(HRK): Croatian Kuna",
			"iso_code": "HRK",
			"accepts_american_express": true
		},
		"HTG": { 
			"currency_group": 1,
			"name": "(HTG): Haitian Gourde",
			"iso_code": "HTG",
			"accepts_american_express": true
		},
		"HUF": { 
			"currency_group": 1,
			"name": "(HUF): Hungarian Forint",
			"iso_code": "HUF",
			"accepts_american_express": false
		},
		"IDR": { 
			"currency_group": 1,
			"name": "(IDR): Indonesian Rupiah",
			"iso_code": "IDR",
			"accepts_american_express": true
		},
		"ILS": { 
			"currency_group": 1,
			"name": "(ILS): Israeli New Sheqel",
			"iso_code": "ILS",
			"accepts_american_express": true
		},
		"INR": { 
			"currency_group": 1,
			"name": "(INR): Indian Rupee",
			"iso_code": "INR",
			"accepts_american_express": false
		},
		"ISK": { 
			"currency_group": 1,
			"name": "(ISK): Icelandic Króna",
			"iso_code": "ISK",
			"accepts_american_express": true
		},
		"JMD": { 
			"currency_group": 1,
			"name": "(JMD): Jamaican Dollar",
			"iso_code": "JMD",
			"accepts_american_express": true
		},
		"JPY": { 
			"currency_group": 1,
			"name": "(JPY): Japanese Yen",
			"iso_code": "JPY",
			"accepts_american_express": true
		},
		"KES": { 
			"currency_group": 1,
			"name": "(KES): Kenyan Shilling",
			"iso_code": "KES",
			"accepts_american_express": true
		},
		"KHR": { 
			"currency_group": 1,
			"name": "(KHR): Cambodian Riel",
			"iso_code": "KHR",
			"accepts_american_express": true
		},
		"KMF": { 
			"currency_group": 1,
			"name": "(KMF): Comorian Franc",
			"iso_code": "KMF",
			"accepts_american_express": true
		},
		"KRW": { 
			"currency_group": 1,
			"name": "(KRW): South Korean Won",
			"iso_code": "KRW",
			"accepts_american_express": true
		},
		"KYD": { 
			"currency_group": 1,
			"name": "(KYD): Cayman Islands Dollar",
			"iso_code": "KYD",
			"accepts_american_express": true
		},
		"KZT": { 
			"currency_group": 1,
			"name": "(KZT): Kazakhstani Tenge",
			"iso_code": "KZT",
			"accepts_american_express": true
		},
		"LAK": { 
			"currency_group": 1,
			"name": "(LAK): Lao Kip",
			"iso_code": "LAK",
			"accepts_american_express": false
		},
		"LBP": { 
			"currency_group": 1,
			"name": "(LBP): Lebanese Pound",
			"iso_code": "LBP",
			"accepts_american_express": true
		},
		"LKR": { 
			"currency_group": 1,
			"name": "(LKR): Sri Lankan Rupee",
			"iso_code": "LKR",
			"accepts_american_express": true
		},
		"LRD": { 
			"currency_group": 1,
			"name": "(LRD): Liberian Dollar",
			"iso_code": "LRD",
			"accepts_american_express": true
		},
		"MAD": { 
			"currency_group": 1,
			"name": "(MAD): Moroccan Dirham",
			"iso_code": "MAD",
			"accepts_american_express": true
		},
		"MDL": { 
			"currency_group": 1,
			"name": "(MDL): Moldovan Leu",
			"iso_code": "MDL",
			"accepts_american_express": true
		},
		"MNT": { 
			"currency_group": 1,
			"name": "(MNT): Mongolian Tögrög",
			"iso_code": "MNT",
			"accepts_american_express": true
		},
		"MOP": { 
			"currency_group": 1,
			"name": "(MOP): Macanese Pataca",
			"iso_code": "MOP",
			"accepts_american_express": true
		},
		"MRO": { 
			"currency_group": 1,
			"name": "(MRO): Mauritanian Ouguiya",
			"iso_code": "MRO",
			"accepts_american_express": true
		},
		"MUR": { 
			"currency_group": 1,
			"name": "(MUR): Mauritian Rupee",
			"iso_code": "MUR",
			"accepts_american_express": false
		},
		"MVR": { 
			"currency_group": 1,
			"name": "(MVR): Maldivian Rufiyaa",
			"iso_code": "MVR",
			"accepts_american_express": true
		},
		"MWK": { 
			"currency_group": 1,
			"name": "(MWK): Malawian Kwacha",
			"iso_code": "MWK",
			"accepts_american_express": true
		},
		"MXN": { 
			"currency_group": 1,
			"name": "(MXN): Mexican Peso",
			"iso_code": "MXN",
			"accepts_american_express": false
		},
		"MYR": { 
			"currency_group": 1,
			"name": "(MYR): Malaysian Ringgit",
			"iso_code": "MYR",
			"accepts_american_express": true
		},
		"NAD": { 
			"currency_group": 1,
			"name": "(NAD): Namibian Dollar",
			"iso_code": "NAD",
			"accepts_american_express": true
		},
		"NGN": { 
			"currency_group": 1,
			"name": "(NGN): Nigerian Naira",
			"iso_code": "NGN",
			"accepts_american_express": true
		},
		"NIO": { 
			"currency_group": 1,
			"name": "(NIO): Nicaraguan Córdoba",
			"iso_code": "NIO",
			"accepts_american_express": false
		},
		"NOK": { 
			"currency_group": 1,
			"name": "(NOK): Norwegian Krone",
			"iso_code": "NOK",
			"accepts_american_express": true
		},
		"NPR": { 
			"currency_group": 1,
			"name": "(NPR): Nepalese Rupee",
			"iso_code": "NPR",
			"accepts_american_express": true
		},
		"NZD": { 
			"currency_group": 1,
			"name": "(NZD): New Zealand Dollar",
			"iso_code": "NZD",
			"accepts_american_express": true
		},
		"PAB": { 
			"currency_group": 1,
			"name": "(PAB): Panamanian Balboa",
			"iso_code": "PAB",
			"accepts_american_express": false
		},
		"PEN": { 
			"currency_group": 1,
			"name": "(PEN): Peruvian Nuevo Sol",
			"iso_code": "PEN",
			"accepts_american_express": false
		},
		"PGK": { 
			"currency_group": 1,
			"name": "(PGK): Papua New Guinean Kina",
			"iso_code": "PGK",
			"accepts_american_express": true
		},
		"PHP": { 
			"currency_group": 1,
			"name": "(PHP): Philippine Peso",
			"iso_code": "PHP",
			"accepts_american_express": true
		},
		"PKR": { 
			"currency_group": 1,
			"name": "(PKR): Pakistani Rupee",
			"iso_code": "PKR",
			"accepts_american_express": true
		},
		"PLN": { 
			"currency_group": 1,
			"name": "(PLN): Polish Złoty",
			"iso_code": "PLN",
			"accepts_american_express": true
		},
		"PYG": { 
			"currency_group": 1,
			"name": "(PYG): Paraguayan Guaraní",
			"iso_code": "PYG",
			"accepts_american_express": false
		},
		"QAR": { 
			"currency_group": 1,
			"name": "(QAR): Qatari Riyal",
			"iso_code": "QAR",
			"accepts_american_express": true
		},
		"RUB": { 
			"currency_group": 1,
			"name": "(RUB): Russian Ruble",
			"iso_code": "RUB",
			"accepts_american_express": true
		},
		"SAR": { 
			"currency_group": 1,
			"name": "(SAR): Saudi Riyal",
			"iso_code": "SAR",
			"accepts_american_express": true
		},
		"SBD": { 
			"currency_group": 1,
			"name": "(SBD): Solomon Islands Dollar",
			"iso_code": "SBD",
			"accepts_american_express": true
		},
		"SCR": { 
			"currency_group": 1,
			"name": "(SCR): Seychellois Rupee",
			"iso_code": "SCR",
			"accepts_american_express": true
		},
		"SEK": { 
			"currency_group": 1,
			"name": "(SEK): Swedish Krona",
			"iso_code": "SEK",
			"accepts_american_express": true
		},
		"SGD": { 
			"currency_group": 1,
			"name": "(SGD): Singapore Dollar",
			"iso_code": "SGD",
			"accepts_american_express": true
		},
		"SHP": { 
			"currency_group": 1,
			"name": "(SHP): Saint Helenian Pound",
			"iso_code": "SHP",
			"accepts_american_express": false
		},
		"SLL": { 
			"currency_group": 1,
			"name": "(SLL): Sierra Leonean Leone",
			"iso_code": "SLL",
			"accepts_american_express": true
		},
		"SOS": { 
			"currency_group": 1,
			"name": "(SOS): Somali Shilling",
			"iso_code": "SOS",
			"accepts_american_express": true
		},
		"STD": { 
			"currency_group": 1,
			"name": "(STD): São Tomé and Príncipe Dobra",
			"iso_code": "STD",
			"accepts_american_express": true
		},
		"SVC": { 
			"currency_group": 1,
			"name": "(SVC): Salvadoran Colón",
			"iso_code": "SVC",
			"accepts_american_express": false
		},
		"SZL": { 
			"currency_group": 1,
			"name": "(SZL): Swazi Lilangeni",
			"iso_code": "SZL",
			"accepts_american_express": true
		},
		"THB": { 
			"currency_group": 1,
			"name": "(THB): Thai Baht",
			"iso_code": "THB",
			"accepts_american_express": true
		},
		"TOP": { 
			"currency_group": 1,
			"name": "(TOP): Tongan Paʻanga",
			"iso_code": "TOP",
			"accepts_american_express": true
		},
		"TTD": { 
			"currency_group": 1,
			"name": "(TTD): Trinidad and Tobago Dollar",
			"iso_code": "TTD",
			"accepts_american_express": true
		},
		"TWD": { 
			"currency_group": 1,
			"name": "(TWD): New Taiwan Dollar",
			"iso_code": "TWD",
			"accepts_american_express": true
		},
		"TZS": { 
			"currency_group": 1,
			"name": "(TZS): Tanzanian Shilling",
			"iso_code": "TZS",
			"accepts_american_express": true
		},
		"UAH": { 
			"currency_group": 1,
			"name": "(UAH): Ukrainian Hryvnia",
			"iso_code": "UAH",
			"accepts_american_express": true
		},
		"UGX": { 
			"currency_group": 1,
			"name": "(UGX): Ugandan Shilling",
			"iso_code": "UGX",
			"accepts_american_express": true
		},
		"USD": { 
			"currency_group": 1,
			"name": "(USD): United States Dollar",
			"iso_code": "USD",
			"accepts_american_express": true
		},
		"UYU": { 
			"currency_group": 1,
			"name": "(UYU): Uruguayan Peso",
			"iso_code": "UYU",
			"accepts_american_express": false
		},
		"UZS": { 
			"currency_group": 1,
			"name": "(UZS): Uzbekistani Som",
			"iso_code": "UZS",
			"accepts_american_express": true
		},
		"VND": { 
			"currency_group": 1,
			"name": "(VND): Vietnamese Đồng",
			"iso_code": "VND",
			"accepts_american_express": true
		},
		"VUV": { 
			"currency_group": 1,
			"name": "(VUV): Vanuatu Vatu",
			"iso_code": "VUV",
			"accepts_american_express": true
		},
		"WST": { 
			"currency_group": 1,
			"name": "(WST): Samoan Tala",
			"iso_code": "WST",
			"accepts_american_express": true
		},
		"XAF": { 
			"currency_group": 1,
			"name": "(XAF): Central African Cfa Franc",
			"iso_code": "XAF",
			"accepts_american_express": true
		},
		"XOF": { 
			"currency_group": 1,
			"name": "(XOF): West African Cfa Franc",
			"iso_code": "XOF",
			"accepts_american_express": false
		},
		"XPF": { 
			"currency_group": 1,
			"name": "(XPF): Cfp Franc",
			"iso_code": "XPF",
			"accepts_american_express": false
		},
		"YER": { 
			"currency_group": 1,
			"name": "(YER): Yemeni Rial",
			"iso_code": "YER",
			"accepts_american_express": true
		},
		"ZAR": { 
			"currency_group": 1,
			"name": "(ZAR): South African Rand",
			"iso_code": "ZAR",
			"accepts_american_express": true
		},

		"AFN": {
			"currency_group": 2,
			"name": "(AFN): Afghan Afghani",
			"iso_code": "AFN",
			"accepts_american_express": false
		},
		"AMD": {
			"currency_group": 2,
			"name": "(AMD): Armenian Dram",
			"iso_code": "AMD",
			"accepts_american_express": true
		},
		"AOA": {
			"currency_group": 2,
			"name": "(AOA): Angolan Kwanza",
			"iso_code": "AOA",
			"accepts_american_express": false
		},
		"AZN": {
			"currency_group": 2,
			"name": "(AZN): Azerbaijani Manat",
			"iso_code": "AZN",
			"accepts_american_express": true
		},
		"BAM": {
			"currency_group": 2,
			"name": "(BAM): Bosnia & Herzegovina Convertible Mark",
			"iso_code": "BAM",
			"accepts_american_express": true
		},
		"BGN": {
			"currency_group": 2,
			"name": "(BGN): Bulgarian Lev",
			"iso_code": "BGN",
			"accepts_american_express": true
		},
		"CDF": {
			"currency_group": 2,
			"name": "(CDF): Congolese Franc",
			"iso_code": "CDF",
			"accepts_american_express": true
		},
		"GEL": {
			"currency_group": 2,
			"name": "(GEL): Georgian Lari",
			"iso_code": "GEL",
			"accepts_american_express": true
		},
		"KGS": {
			"currency_group": 2,
			"name": "(KGS): Kyrgyzstani Som",
			"iso_code": "KGS",
			"accepts_american_express": true
		},
		"LSL": {
			"currency_group": 2,
			"name": "(LSL): Lesotho Loti",
			"iso_code": "LSL",
			"accepts_american_express": true
		},
		"MGA": {
			"currency_group": 2,
			"name": "(MGA): Malagasy Ariary",
			"iso_code": "MGA",
			"accepts_american_express": true
		},
		"MKD": {
			"currency_group": 2,
			"name": "(MKD): Macedonian Denar",
			"iso_code": "MKD",
			"accepts_american_express": true
		},
		"MZN": {
			"currency_group": 2,
			"name": "(MZN): Mozambican Metical",
			"iso_code": "MZN",
			"accepts_american_express": true
		},
		"RON": {
			"currency_group": 2,
			"name": "(RON): Romanian Leu",
			"iso_code": "RON",
			"accepts_american_express": true
		},
		"RSD": {
			"currency_group": 2,
			"name": "(RSD): Serbian Dinar",
			"iso_code": "RSD",
			"accepts_american_express": true
		},
		"RWF": {
			"currency_group": 2,
			"name": "(RWF): Rwandan Franc",
			"iso_code": "RWF",
			"accepts_american_express": true
		},
		"SRD": {
			"currency_group": 2,
			"name": "(SRD): Surinamese Dollar",
			"iso_code": "SRD",
			"accepts_american_express": false
		},
		"TJS": {
			"currency_group": 2,
			"name": "(TJS): Tajikistani Somoni",
			"iso_code": "TJS",
			"accepts_american_express": true
		},
		"TRY": {
			"currency_group": 2,
			"name": "(TRY): Turkish Lira",
			"iso_code": "TRY",
			"accepts_american_express": true
		},
		"XCD": {
			"currency_group": 2,
			"name": "(XCD): East Caribbean Dollar",
			"iso_code": "XCD",
			"accepts_american_express": true
		},
		"ZMW": {
			"currency_group": 2,
			"name": "(ZMW): Zambian Kwacha",
			"iso_code": "ZMW",
			"accepts_american_express": true
		}
	}
});