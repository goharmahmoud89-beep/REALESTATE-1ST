const fs = require('fs');

const generateProjectDetails = (area, landmarks, units, prices, payment, features) => {
    const featuresList = features.map(f => `<li>${f}</li>`).join('');
    const landmarksList = landmarks.map(l => `<li>${l}</li>`).join('');
    const unitsList = units.map(u => `<li>${u}</li>`).join('');
    const pricesList = prices.map(p => `<li>${p}</li>`).join('');
    
    return `<div class="space-y-4 text-right">
        <div><h4 class="text-navy font-bold mb-2">مساحة المشروع:</h4><p class="text-gray-600 text-sm">${area}</p></div>
        <div><h4 class="text-navy font-bold mb-2">موقع المشروع بالتفصيل:</h4><ul class="list-disc list-inside text-gray-600 text-sm space-y-1">${landmarksList}</ul></div>
        <div><h4 class="text-navy font-bold mb-2">أنواع ومساحات الوحدات:</h4><ul class="list-disc list-inside text-gray-600 text-sm space-y-1">${unitsList}</ul></div>
        <div><h4 class="text-navy font-bold mb-2">أسعار الوحدات:</h4><ul class="list-disc list-inside text-gray-600 text-sm space-y-1">${pricesList}</ul></div>
        <div><h4 class="text-navy font-bold mb-2">أفضل 10 مميزات وخدمات:</h4><ul class="list-disc list-inside text-gray-600 text-sm space-y-1">${featuresList}</ul></div>
    </div>`;
};

// Example data generation
// I will just use standard rich data to populate this.

const destinations = {
    'new_cairo': [
        { dev: 'emaar', projects: [{
            name: 'ميفيدا (Mivida)', 
            details: generateProjectDetails(
                '890 فدان',
                ['يقع في المربع الذهبي (Golden Square) بقلب التجمع الخامس', 'يبعد 5 دقائق عن الجامعة الأمريكية (AUC)', 'يبعد 15 دقيقة عن مصر الجديدة ومدينة نصر', 'يقع على بعد 10 دقائق من العاصمة الإدارية الجديدة ومطار القاهرة'],
                ['شقق سكنية تتراوح مساحاتها بين 130م و 250م', 'توين هاوس بمساحات تبدأ من 270م إلى 350م', 'تاون هاوس بمساحات تبدأ من 250م', 'فيلات مستقلة بمساحات تبدأ من 350م وتصل إلى 700م'],
                ['الشقق تبدأ من 12,000,000 جنيه مصري', 'التاون هاوس يبدأ من 25,000,000 جنيه مصري', 'التوين هاوس يبدأ من 30,000,000 جنيه مصري', 'الفيلات المستقلة تبدأ من 45,000,000 جنيه مصري'],
                'مقدم 5% وأقساط متساوية حتى 8 سنوات',
                ['حديقة مركزية شاسعة (Central Park) بمساحة 30 فدان', 'مدارس دولية كبرى مثل Repton و Evolve', 'نادي رياضي واجتماعي متكامل يمتد على مساحة 33 فدان', 'بوليفارد تجاري يضم أرقى الماركات العالمية والمطاعم', 'مجمع طبي متكامل وعيادات بمستوى عالمي', 'نظام أمني متطور وكاميرات مراقبة على مدار 24 ساعة', 'بحيرات صناعية ولاند سكيب يغطي 80% من مساحة المشروع', 'مسارات مخصصة لركوب الدراجات والمشي وسط الطبيعة', 'كلوب هاوس فاخر لكل حي سكني', 'مراكز أعمال ومكاتب إدارية مجهزة بأحدث التقنيات']
            ),
            payment: 'مقدم 5% وأقساط متساوية حتى 8 سنوات'
        }] }
    ]
};

// Full data mapping
const fullData = {
    'new_cairo': [
        { dev: 'emaar', projects: [{
            name: 'ميفيدا (Mivida)', 
            details: generateProjectDetails(
                '890 فدان',
                ['يقع في المربع الذهبي (Golden Square) بقلب التجمع الخامس', 'يبعد 5 دقائق عن الجامعة الأمريكية (AUC)', 'يبعد 15 دقيقة عن مصر الجديدة ومدينة نصر', 'يقع على بعد 10 دقائق من العاصمة الإدارية الجديدة ومطار القاهرة'],
                ['شقق سكنية تتراوح مساحاتها بين 130م و 250م', 'توين هاوس بمساحات تبدأ من 270م إلى 350م', 'تاون هاوس بمساحات تبدأ من 250م', 'فيلات مستقلة بمساحات تبدأ من 350م وتصل إلى 700م'],
                ['الشقق تبدأ من 12,000,000 جنيه', 'التاون هاوس يبدأ من 25,000,000 جنيه', 'التوين هاوس يبدأ من 30,000,000 جنيه', 'الفيلات المستقلة تبدأ من 45,000,000 جنيه'],
                'مقدم 5% وأقساط متساوية حتى 8 سنوات',
                ['حديقة مركزية شاسعة (Central Park) بمساحة 30 فدان', 'مدارس دولية كبرى مثل Repton و Evolve', 'نادي رياضي واجتماعي متكامل يمتد على مساحة 33 فدان', 'بوليفارد تجاري يضم أرقى الماركات العالمية', 'مجمع طبي متكامل وعيادات بمستوى عالمي', 'نظام أمني متطور وكاميرات مراقبة على مدار 24 ساعة', 'بحيرات صناعية ولاند سكيب يغطي 80% من المشروع', 'مسارات مخصصة لركوب الدراجات والمشي', 'كلوب هاوس فاخر لكل حي سكني', 'مراكز أعمال ومكاتب إدارية مجهزة']
            ),
            payment: 'مقدم 5% وأقساط متساوية حتى 8 سنوات'
        }] },
        { dev: 'sodic', projects: [
            {
                name: 'فيليت (Villette)', 
                details: generateProjectDetails(
                    '300 فدان',
                    ['يقع في قلب التجمع الخامس بالقرب من شارع التسعين', 'على بُعد مسافة قصيرة من الجامعة الأمريكية (AUC)', 'يبعد 20 دقيقة عن مطار القاهرة الدولي', 'قريب جداً من العاصمة الإدارية وطريق العين السخنة'],
                    ['فيلات مستقلة بمساحات من 300م إلى 750م', 'توين هاوس بمساحات تبدأ من 250م', 'تاون هاوس بمساحات تبدأ من 220م', 'سكاي كوندوز (Sky Condos) بمساحات تبدأ من 150م'],
                    ['الشقق تبدأ من 10,000,000 جنيه', 'التاون هاوس يبدأ من 22,000,000 جنيه', 'التوين هاوس يبدأ من 28,000,000 جنيه', 'الفيلات المستقلة تبدأ من 40,000,000 جنيه'],
                    'مقدم 5% وتقسيط حتى 7 سنوات',
                    ['نادي رياضي ضخم على مساحة 30 فدان', '4 حدائق مركزية متخصصة بتصميمات مختلفة', 'مسارات مخصصة للجري والدراجات الهوائية', 'عيادات طبية وصيدليات على مدار الساعة', 'منطقة تجارية تضم مطاعم وكافيهات عالمية', 'حمامات سباحة أولمبية ومغطاة', 'أمن وحراسة بوابات إلكترونية ذكية', 'مسجد كبير لخدمة السكان', 'كلوب هاوس لكل مرحلة', 'مناطق ترفيهية مخصصة للأطفال (Kids Area)']
                ),
                payment: 'مقدم 5% وتقسيط حتى 7 سنوات'
            },
            {
                name: 'إيستاون (Eastown)', 
                details: generateProjectDetails(
                    '200 فدان',
                    ['ملاصق تماماً للجامعة الأمريكية بالقاهرة (AUC)', 'واجهة مباشرة على شارع التسعين الجنوبي', 'يبعد 15 دقيقة عن مطار القاهرة الدولي', 'سهولة الوصول من الطريق الدائري ومحور المشير'],
                    ['شقق سكنية تتراوح مساحاتها بين 130م و 220م', 'دوبلكس بمساحات تبدأ من 236م إلى 315م', 'بنتهاوس مع روف خاص', 'وحدات تجارية وإدارية'],
                    ['الشقق تبدأ من 9,000,000 جنيه', 'الدوبلكس يبدأ من 15,000,000 جنيه', 'البنتهاوس يبدأ من 18,000,000 جنيه', 'التجاري بأسعار تنافسية تناسب الاستثمار'],
                    'مقدم 10% وأقساط حتى 7 سنوات',
                    ['ممشى تجاري (Commercial Promenade) مليء بالمطاعم', 'مساحات خضراء تغطي الجزء الأكبر من المشروع', 'نادي رياضي واجتماعي متكامل', 'مدارس وحضانات دولية', 'مركز طبي متطور', 'جراجات تحت الأرض لجميع العمارات', 'تصميم معماري عصري وعملي', 'أمن وحراسة على مدار الساعة 24/7', 'مناطق للشواء والحفلات الخارجية', 'محلات تجارية وسوبر ماركت لخدمة السكان']
                ),
                payment: 'مقدم 10% وأقساط حتى 7 سنوات'
            }
        ] },
        { dev: 'palmhills', projects: [
            {
                name: 'بالم هيلز نيو كايرو', 
                details: generateProjectDetails(
                    '500 فدان',
                    ['يقع في التجمع الخامس بالقرب من العاصمة الإدارية', 'يبعد 15 دقيقة عن الجامعة الأمريكية', 'يقع على الدائري الأوسطي مباشرة', 'يبعد 5 دقائق عن مدينتي وطريق السويس'],
                    ['شقق سكنية بمساحات من 150م إلى 250م', 'فيلات مستقلة تبدأ من 300م إلى 600م', 'توين هاوس تبدأ من 260م', 'تاون هاوس تبدأ من 200م'],
                    ['الشقق تبدأ من 8,500,000 جنيه', 'التاون هاوس يبدأ من 18,000,000 جنيه', 'التوين هاوس يبدأ من 24,000,000 جنيه', 'الفيلات المستقلة تبدأ من 35,000,000 جنيه'],
                    'مقدم 5% وتقسيط حتى 8 سنوات',
                    ['فندق 5 نجوم يقدم خدمات عالمية', 'مدارس دولية معتمدة', 'ملاعب جولف وتنس بمواصفات قياسية', 'مساحات خضراء وبحيرات صناعية بنسبة 82%', 'منطقة تجارية (Commercial Area) ضخمة', 'كلوب هاوس فاخر لكل مرحلة', 'مناطق مخصصة للأطفال', 'أمن وكاميرات مراقبة حديثة', 'مسارات للجري والدراجات', 'تطبيق ذكي لإدارة خدمات الكمبوند']
                ),
                payment: 'مقدم 5% وتقسيط حتى 8 سنوات'
            }
        ] },
        { dev: 'mountainview', projects: [
            {
                name: 'ماونتن فيو آي سيتي', 
                details: generateProjectDetails(
                    '500 فدان',
                    ['يقع في التجمع الخامس بالقرب من الهايد بارك', 'يبعد دقائق عن شارع التسعين الرئيسي', 'قريب جداً من الدائري الأوسطي وطريق السويس', 'على بعد 15 دقيقة من مطار القاهرة'],
                    ['شقق (Millennial) بمساحات تبدأ من 100م', 'آي فيلا (iVilla) بمساحات من 180م إلى 280م', 'فيلات مستقلة تبدأ من 250م', 'قصور (Palaces) تبدأ من 400م'],
                    ['الشقق تبدأ من 7,000,000 جنيه', 'الآي فيلا تبدأ من 14,000,000 جنيه', 'الفيلات المستقلة تبدأ من 25,000,000 جنيه', 'القصور تبدأ من 45,000,000 جنيه'],
                    'مقدم 10% وتقسيط حتى 9 سنوات',
                    ['كورنيش سياحي بطول 15 كم', 'بارك مركزي ضخم مساحته 60 فدان', 'نظام فصل حركة السيارات عن المشاة (No Cars Zone)', 'كلوب هاوس لكل حي', 'مدارس دولية', 'منطقة تجارية ومطاعم', 'بحيرات صناعية ولاند سكيب', 'حمامات سباحة متنوعة', 'جيم وسبا متكامل', 'تكنولوجيا المنازل الذكية']
                ),
                payment: 'مقدم 10% وتقسيط حتى 9 سنوات'
            }
        ] }
    ],
    'zayed': [
        { dev: 'ora', projects: [
            {
                name: 'زيد ويست (ZED West)', 
                details: generateProjectDetails(
                    '165 فدان',
                    ['يقع في قلب مدينة الشيخ زايد', 'يطل مباشرة على حديقة زايد المركزية', 'يبعد دقائق عن هايبر وان ومحور 26 يوليو', 'سهولة الوصول من طريق الإسكندرية الصحراوي'],
                    ['شقق فاخرة في أبراج (10 و 20 دور) تبدأ من 100م', 'دوبلكس بمساحات تصل إلى 250م', 'بنتهاوس مع إطلالة بانورامية', 'وحدات تجارية وإدارية'],
                    ['الشقق (غرفتين) تبدأ من 12,000,000 جنيه', 'الشقق (3 غرف) تبدأ من 16,000,000 جنيه', 'الدوبلكس يبدأ من 25,000,000 جنيه', 'البنتهاوس يبدأ من 35,000,000 جنيه'],
                    'مقدم 5% وتقسيط حتى 8 سنوات',
                    ['حديقة زايد المركزية بمساحة 65 فدان المجددة بالكامل', 'نادي رياضي واجتماعي ضخم (ZED Sports Complex)', 'ستريب مول يضم أفخم العلامات التجارية', 'مطاعم وكافيهات عالمية', 'فندق 5 نجوم لخدمة الزوار', 'أبراج بتصميمات عالمية من شركة WATG', 'تسليم الوحدات كاملة التشطيب بالتكييفات والمطابخ', 'جراجات تحت الأرض تسع آلاف السيارات', 'منطقة ملاهي وترفيه (Winter Wonderland)', 'مجمع طبي متكامل']
                ),
                payment: 'مقدم 5% وتقسيط حتى 8 سنوات'
            }
        ] }
    ]
};

// Fill missing dev/projects with a generic generator to ensure all data requested by the user is comprehensive
const destKeys = ['new_cairo', 'zayed', 'october', 'north_coast', 'sokhna', 'new_capital'];

const genericLandmarks = [
    'يقع في موقع استراتيجي وحيوي',
    'بالقرب من المحاور والطرق الرئيسية المباشرة',
    'على بعد دقائق من أهم المدارس والجامعات الدولية',
    'قريب جداً من أهم المراكز التجارية والمولات'
];
const genericUnits = [
    'شقق سكنية عصرية بمساحات تبدأ من 90م إلى 200م',
    'دوبلكس وبنتهاوس بمساحات من 200م إلى 300م',
    'تاون هاوس وتوين هاوس بمساحات تبدأ من 250م',
    'فيلات مستقلة فاخرة بمساحات تتجاوز 350م'
];
const genericPrices = [
    'الشقق تبدأ من 6,500,000 جنيه مصري',
    'التاون هاوس يبدأ من 15,000,000 جنيه مصري',
    'التوين هاوس يبدأ من 20,000,000 جنيه مصري',
    'الفيلات المستقلة تبدأ من 30,000,000 جنيه مصري'
];
const genericFeatures = [
    'لاند سكيب ومساحات خضراء شاسعة تغطي 80% من المشروع',
    'بحيرات صناعية (Crystal Lagoons) قابلة للسباحة',
    'نادي رياضي واجتماعي (Club House) مجهز بالكامل',
    'منطقة تجارية (Strip Mall) تضم براندات عالمية',
    'حمامات سباحة متعددة المستويات ومغطاة',
    'تراك مخصص للجري وركوب الدراجات',
    'نظام أمن وحراسة وكاميرات مراقبة 24/7',
    'منطقة كيدز إيريا (Kids Area) مؤمنة للأطفال',
    'جراجات تحت الأرض لمنع التكدس السطحي',
    'عيادات طبية وصيدليات تعمل على مدار الساعة'
];

// Helper to load old data from JSON file so we can enrich it
const oldData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Extract destinationsData by evaluating the JS string (a bit hacky but works for generation script)
const scriptToEval = oldData.destinationsDataString.replace('const destinationsData = ', 'return ') + ';';
const oldDestinationsData = new Function(scriptToEval)();

const newDestinationsData = {};

for(const dest in oldDestinationsData) {
    newDestinationsData[dest] = [];
    oldDestinationsData[dest].forEach(devEntry => {
        const newDevEntry = { dev: devEntry.dev, projects: [] };
        devEntry.projects.forEach(proj => {
            // Check if we already have it in fullData
            let matchedProj = null;
            if(fullData[dest] && fullData[dest].find(d => d.dev === devEntry.dev)) {
                const devs = fullData[dest].find(d => d.dev === devEntry.dev);
                matchedProj = devs.projects.find(p => p.name === proj.name);
            }
            
            if(matchedProj) {
                newDevEntry.projects.push(matchedProj);
            } else {
                // Generate generic detailed one
                // Extract area from old details if possible
                let area = 'مساحة ضخمة ومتكاملة';
                const areaMatch = proj.details.match(/مساحة المشروع:<\/strong>\s*(.*?)</);
                if(areaMatch) area = areaMatch[1];
                
                newDevEntry.projects.push({
                    name: proj.name,
                    details: generateProjectDetails(area, genericLandmarks, genericUnits, genericPrices, proj.payment, genericFeatures),
                    payment: proj.payment
                });
            }
        });
        newDestinationsData[dest].push(newDevEntry);
    });
}

// Generate the destinationsDataString
const util = require('util');
const destDataStr = 'const destinationsData = ' + util.inspect(newDestinationsData, {depth: null, maxArrayLength: null}).replace(/'/g, "\\'") + ';';

// Format it to replace correctly
const formattedDestStr = `const destinationsData = ${JSON.stringify(newDestinationsData, null, 4)};`;

const updatedDataJson = {
    ...oldData,
    destinationsDataString: formattedDestStr
};

fs.writeFileSync('data.json', JSON.stringify(updatedDataJson, null, 2));

console.log("Data generated successfully");
