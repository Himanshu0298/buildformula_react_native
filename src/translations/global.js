const translations = {
  'en': {
    translation: {
      //label
      paymentInstallment: [{ id: 1, name: 'Full payment' }, { id: 2, name: 'Custom Payment' }, { id: 3, name: '1st big installment' }],
      labelSignInInfo: 'Sign in to your account',
      labelSignUp: 'Sign Up to your account',
      labelDontHaveAccount: 'Don’t have an account? ',
      labelAlreadyHaveAccount: 'Already have an account? ',
      labelForgotPassword: 'Forgot password?',
      labelForgotPasswordInstruction: "Enter your e-mail address and we we'll send you a link to reset your password.",
      labelCreate: 'Create',
      labelSearch: 'Search',
      labelLogin: 'Login',
      labelLoading: 'Loading...',
      labelSignIn: 'Sign in',
      labelOk: 'OK',
      labelSignup: 'Sign Up',
      labelCancel: 'Cancel',
      labelBack: 'Back',
      labelInvalid: 'Invalid',
      labelSend: 'Send',
      labelSelectLanguage: 'Please Select Preferred Language',
      labelBackToLogin: 'Back to login',
      labelRole: 'Role',
      labelAddRole: 'Add Role',
      labelAddUser: 'Add user',
      labelAddFollowUp: 'Add Follow Up',
      labelJointName: 'Joint name',
      labelPanCard: 'Pan',
      labelAadharCard: 'Aadhar',
      labelDelete: 'Delete',
      labelRename: 'Rename',
      labelDeleteMessage: 'Are you sure you want to delete?',
      labelAdd: 'Add',
      labelNext: 'Next',
      labelInstallments: 'Installments',
      labelStructure: 'Select Structure',
      labelIsActive: 'Active?',
      labelSave: 'Save',
      labelUser: 'User',
      labelInquiry: 'Inquiry',
      labelFollowUpHistory: 'Follow up history',
      labelLeadPriority: 'Lead Priority',
      labelInquiryCategory: 'Inquiry category',
      labelCustomerDetails: 'Customer Details',
      labelBrokerDetails: 'Broker details',
      labelBookingRate: 'Booking Rate',
      labelRateForBuildUp: 'Rate of',
      labelAreaForBuildUp: 'Area of',
      labelSuperBuildUp: 'Super Built up',
      labelDone: 'Done',
      labelRateCarpet: 'Rate for Carpet',
      labelAreaCarpet: 'Area for Carpet',
      labelCarpet: 'Carpet',
      labelBuildUp: 'Build Up',
      labelStoragePermissionTitle: 'Need phone Storage Permission.',
      labelStoragePermissionMsg: 'App needs access to your phone storage',
      labelAskMeLater: 'Ask Me Later',
      labelOtherCharges: 'Other Charges',
      labelEdit: 'Edit',
      labelAsignedTask: 'Assigned Tasks',

      labelFileManagment: 'File Management',
      labelSiteSelect: 'Select Site',
      labelFinalBill: 'Final Bill Amount',

      labelRateBuildUp: 'Rate for BuiltUp',
      labelAreaBuildUp: 'Area for BuiltUp',

      labelTotalBasicAmount: 'Total Basic Amount',
      labelTotalOtherCharges: 'Total Other Charges',
      labelReminingPaymet: 'Remaining Payment',


      labelMainPhase: 'Main Phase',

      labelTower: 'Tower',

      labelOptions: 'Options',
      labelCreateFolder: 'Create Folder',


      labelSelectProfileImage: 'Select profile picture',
      labelSelectPan: 'Select pan card',
      labelSelectAadhar: 'Select aadhar card',
      labelBookingChart: 'Booking Chart',
      labelMyBookings: 'My Bookings',

      labelTerms: 'All provided information and uploaded documents are original',
      labelUserProfile: 'User profile',
      labelGroundFloor: 'Ground floor',
      labelFloor: 'Floor',
      labelPayment: 'Payment',

      placeHolderSelectCustomer: 'Select Customer',

      placeHolderSelectBroker: 'Select Broker',
      placeHolderSelectPayment: 'Select payment method',
      placeHolderNoOfInstaments: 'No. of Installments',
      placeHolderNoOfIntervals: 'No. of month intervals',
      placeHolderInstallemntAmountBig: '1st big installment amount',
      placeHolderInstallemntPercentageBig: '1st big installment percentage',

      placeHolderOtherCharges: 'eg. Parking, taxes etc.',
      placeHolderFolderName: 'Folder Name',
      labelBookingDetails: 'Booking details',

      //PlaceHolders
      placeHolderEmailOrPhone: 'Email Or Phone',
      placeHolderPassword: 'Password',
      placeHolderConfirmPassword: 'Confirm Password',
      placeHolderFirstName: 'Firstname',
      placeHolderJointPerson: 'Joint Person',
      placeHolderLastName: 'Lastname',
      placeHolderPhone: 'Phone Number',
      placeHolderInstallemntPercentage: 'Installment in percentage',

      placeHolderAlternetPhone: 'Alternet phone number',
      placeHolderComment: 'Comment',
      placeHolderPanNumber: 'Pan number',
      placeHolderAadharNumber: 'Aadhar number',
      placeHolderAge: 'Age',
      placeHolderOccupation: 'Occupation',
      placeHolderEmail: 'Email',
      placeHolderBudgetFrom: 'Budget From',
      placeHolderBudgetTo: 'Budget To',
      placeHolderAmount: 'Amount',
      placeHolderInstallmentAmount: 'Installment Amount',
      placeHolderInstallmentRemark: 'Installment Remark',

      placeHolderRemark: 'Remark',
      placeHolderAddress: 'Address',
      placeHolderCompany: 'Select Company',
      placeHolderPhase: 'Select Phase',
      placeHolderBirthDate: 'Select Birthdate',
      placeHolderState: 'Select State',
      placeHolderCity: 'Select City',
      placeHolderFollowUpDate: 'Follow Up Date',
      placeHolderPaymentStartDate: 'Payment Start Date',
      placeHolderPaymentEndDate: 'Payment End Date',
      placeHolderInstallmentDate: 'Installment Date',
      placeHolderAddRemainingPayment: 'Add remaining Payment',


      placeHolderBrokerName: 'Broker Name',
      placeHolderBrokerPhone: 'Broker Phone Number',


      //Arrays
      filterStoreOptions: ['Verified', 'Pending', 'Cancel'],

      //Messages
      msgBlankFields: 'Please fill all required fields!',
      msgBlankUserImage: 'Please select user image',
      msgBlankUserPanImage: 'Please select PAN image',
      msgBlankJointUserPanImage: 'Please select joint PAN image',
      msgBlankJointUserAadharImage: 'Please select joint Aadhar image',
      msgWrongTotalBasicAmount: 'Total amount must be greater than 0',
      msgWrongBigInstallmentAmount: '1st big installment amount is greater than 0',
      msgSomethingWrong: 'Something went wrong.Please try again later.',
      msgBlankAllRate: 'Please fill any one rate',
      msgBlankSuperBuildUp: 'Select measurement for super built up',
      msgBlankCarpet: 'Select measurement for carpet',
      msgBlankBuildUp: 'Select measurement for built up',
      msgWrongBudgetValue: 'Budget To must be greater than budget From',

      msgBlankAllArea: 'Please fill any one from Area',
      msgBlankAreaSuperBuiltUp: 'Select measurement for area super built up',
      msgBlankAreaCarpet: 'Select measurement for area carpet',
      msgBlankAreaBuildUp: 'Select measurement for area built up',
      msgBlankTotalAmount: 'Please add total basic amount!',
      msgBlankUserAadharImage: 'Please select Aadhar image',
      msgTermsAndCondition: 'Please accepts terms and conditions',
      msgSelectPaymentMethod: 'Please select payment method!',
      msgInstallmentNotComplete: 'Please add installments until remaining payment is 0.',
      msgBlankEmailOrPhone: 'Please enter email or phone!',
      msgBlankFirstName: 'Please enter First Name!',
      msgBlankLastName: 'Please enter Last Name!',
      msgBlankPhone: 'Please enter Phone Number!',
      msgBlankEmail: 'Please enter email!',
      msgBlankRole: 'Please enter role!',
      msgBlankInquiryCategory: 'Please select inquiry category!',
      msgBlankInquiryPriority: 'Please select lead priority!',

      msgBlankInstallmentDate: 'Select Installment Date',

      msgBlankAddress: 'Please enter address!',
      msgBlankPan: 'Please enter pan',
      msgBlankAadhar: 'please enter Aadhar Number',
      msgBlankAge: 'Please enter age',
      msgBlankOccupation: 'Please enter occupation',









      msgBlankPassword: 'Please enter password!',
      msgBlankConfirmPassword: 'Please enter confirm password!',
      msgBlankCompany: 'Please select company!',
      msgBlankBirthDate: 'Please select birthdate!',
      msgBlankState: 'Please select State!',
      msgBlankCity: 'Please select City!',
      msgBlankFollowUpDate: 'Please select Follow up date',
      msgBlankStartDate: 'Please enter payment start date.',
      msgBlankEndDate: 'Please enter payment end date.',
      msgPasswordNotMatch: 'Password dose not match!',
      msgWrongPhone: 'Please enter correct phone number!',
      msgWrongInstallmentLarge: 'Your entered amount is larger than remaining payment',
      msgWrongAlternetPhone: 'Please enter correct alternet phone number',
      msgWrongEmail: 'Please enter correct email!',
      msgWrongAadhar: 'please enter correct Aadhar Number',
      msgWrongPan: 'please enter correct pan',
      msgWrongAge: 'please enter correct age',
      msgWrongCharge: 'Charge must be greater than 0',
      msgWrongInstallment: 'Installment must be greater than 0',

      msgNoDataTitle: 'No Data!',
      msgNoCompanyFound: 'No Company Found.',
      msgNoBookingFound: 'No booking found.',
      msgNoTaskFound: 'No task found.',
      msgNoRoleFound: 'No roles found.',
      msgNoUserFound: 'No user found.',
      msgNoStateFound: 'No state found.',
      msgNoCityFound: 'No city found.',
      msgNoStructureFound: 'No Structure found.',
      msgNoFilesAndFolder: 'No files and folder.',
      msgNoinquiriesFound: 'No inquiries found.',
      msgNoPaymentsFound: 'No Payment Found',
      msgNoFollowUpFound: 'No Follow up',
      msgBlankInstallment: 'Please add installment.',
    },
  },
  'hi': {
    translation: {
      labelSignInInfo: 'अपने अकाउंट में साइन इन करें',
      labelSignUp: 'अपने खाते में साइन अप करें',
      labelDontHaveAccount: 'क्या आपका खाता नहीं है? ',
      labelForgotPassword: 'पासवर्ड भूल गए?',
      labelForgotPasswordInstruction: 'अपना ई-मेल पता दर्ज करें और हम आपको अपना पासवर्ड रीसेट करने के लिए एक लिंक भेजेंगे।',
      labelAlreadyHaveAccount: 'पहले से ही एक खाता है?',
      labelCreate: 'सर्जन करना',
      labelSearch: 'खोज',
      labelLogin: 'लॉग इन करें',
      labelLoading: 'लोड हो रहा है...',
      labelSignIn: 'दाखिल करना',
      labelSend: 'भेजना',
      labelOk: 'ठीक',
      labelSignup: 'साइन अप करें',
      labelCancel: 'रद्द करना',
      labelBack: 'वापस',
      labelInvalid: 'अमान्य',
      labelSelectLanguage: 'Please Select Preferred Language',
      labelBackToLogin: 'लॉगिन पर वापस जाएं',
      labelRole: 'भूमिका',
      labelAddRole: 'भूमिका जोड़ें',
      labelAddUser: 'उपयोगकर्ता जोड़ें',
      labelAddFollowUp: 'फॉलो अप जोड़ें',
      labelJointName: 'संयुक्त नाम',
      labelPanCard: 'पैन कार्ड',
      labelAadharCard: 'आधार कार्ड',
      labelTower: 'टॉवर्',
      labelOptions: 'विकल्प',
      labelCreateFolder: 'फोल्डर बनाएं',
      labelRateForBuildUp: 'दर',
      labelAreaForBuildUp: 'क्षेत्र',
      labelSuperBuildUp: 'सुपर बिल्ट अप',
      labelRateCarpet: 'फ़र्श के लिए दर',
      labelCarpet: 'फ़र्श',
      labelBuildUp: 'बिल्ड अप',
      labelStoragePermissionTitle: 'फ़ोन संग्रहण अनुमति की आवश्यकता है।',
      labelStoragePermissionMsg: 'ऐप को आपके फोन स्टोरेज तक पहुंचने की जरूरत है',
      labelAskMeLater: 'मुझसे बाद में पूछना',
      labelAreaCarpet: 'फ़र्श के लिए क्षेत्र',
      labelFinalBill: 'अंतिम बिल राशि',
      labelRateBuildUp: 'बिल्ट अप के लिए दर',
      labelAreaBuildUp: 'निर्मित के लिए क्षेत्र',
      labelTotalBasicAmount: 'कुल मूल राशि',
      labelTotalOtherCharges: 'कुल अन्य शुल्क',
      labelReminingPaymet: 'बचा हुआ भुगतान',
      labelDelete: 'हटाएं!',
      labelRename: 'नाम बदलें',
      labelDeleteMessage: 'क्या आप पक्का इसे हटाना चाहते हैं?',
      labelAdd: 'जोड़ना',
      labelNext: 'अगला',
      labelDone: 'किया हुआ',
      labelInstallments: 'किस्त',
      labelStructure: 'संरचना का चयन करें',
      labelIsActive: 'सक्रिय है',
      labelSave: 'बचाना',
      labelUser: 'उपयोगकर्ता',
      labelInquiry: 'जांच',
      labelFollowUpHistory: 'इतिहास का पालन करें',
      labelLeadPriority: 'लीड प्राथमिकता',
      labelInquiryCategory: 'जांच श्रेणी',
      labelCustomerDetails: 'ग्राहक विस्तार',
      labelBrokerDetails: 'ब्रोकर विवरण',
      labelBookingRate: 'बुकिंग दर',
      labelSelectProfileImage: 'प्रोफ़ाइल चित्र का चयन करें',
      labelSelectPan: 'पैन कार्ड का चयन करें',
      labelSelectAadhar: 'आधार कार्ड का चयन करें',
      labelBookingChart: 'बुकिंग चार्ट',
      labelMyBookings: 'मेरी बुकिंग',
      labelTerms: 'सभी प्रदान की गई जानकारी और अपलोड किए गए दस्तावेज़ मूल हैं!',
      labelUserProfile: 'उपयोगकर्ता प्रोफ़ाइल',
      labelGroundFloor: 'निचली मंजिल',
      labelFloor: 'मंजिल',
      labelPayment: 'भुगतान',
      labelOtherCharges: 'अन्य शुल्क',
      labelEdit: 'संपादित करें',
      labelAsignedTask: 'सौंपा गया कार्य',
      labelFileManagment: 'फाइल प्रबंधन',
      labelSiteSelect: 'साइट का चयन करें',
      placeHolderSelectCustomer: 'ग्राहक का चयन करें',
      placeHolderSelectBroker: 'ब्रोकर का चयन करें',
      placeHolderSelectPayment: 'भुगतान का तरीका चुनें',
      placeHolderNoOfInstaments: 'किस्तों की संख्या',
      placeHolderNoOfIntervals: 'महीने के अंतराल की संख्या',
      placeHolderInstallemntAmountBig: 'पहली बड़ी किश्त राशि',
      placeHolderInstallemntPercentageBig: 'पहली बड़ी किश्त प्रतिशत',
      placeHolderOtherCharges: 'जैसे। पार्किंग, कर आदि।',
      placeHolderFolderName: 'फोल्डर का नाम',


      //PlaceHolders

      placeHolderEmailOrPhone: 'ईमेल या फोन',
      placeHolderPassword: 'पारण शब्द',
      placeHolderConfirmPassword: 'पासवर्ड की पुष्टि कीजिये',
      placeHolderFirstName: 'पहला नाम',
      placeHolderJointPerson: 'संयुक्त व्यक्ति',
      placeHolderLastName: 'अंतिम नाम',
      placeHolderPhone: 'फ़ोन नंबर',
      placeHolderAlternetPhone: 'वैकल्पिक फोन नंबर',
      placeHolderComment: 'टिप्पणी',
      placeHolderInstallemntPercentage: 'प्रतिशत में किस्त',

      placeHolderPanNumber: 'पैन नंबर',
      placeHolderAadharNumber: 'आधार नंबर',
      placeHolderAge: 'उम्र',

      placeHolderOccupation: 'व्यवसाय',

      placeHolderEmail: 'ईमेल',
      placeHolderBudgetFrom: 'बजट प्रारंभ',
      placeHolderBudgetTo: 'बजट अंत',
      placeHolderAmount: 'रकम',
      placeHolderInstallmentAmount: 'किस्त की राशि',
      placeHolderInstallmentRemark: 'किस्त की टिप्पणी',

      placeHolderRemark: 'टिप्पणी',
      placeHolderAddress: 'पता',
      placeHolderPhase: 'चरण का चयन करें',
      placeHolderCompany: 'कंपनी का चयन करें',
      placeHolderBirthDate: 'जन्मतिथि का चयन करें',
      placeHolderState: 'राज्य चुनें',
      placeHolderCity: 'शहर चुनें',
      placeHolderFollowUpDate: 'आगे की कार्यवाही की तारीख',
      placeHolderPaymentStartDate: 'भुगतान की शुरुआत की तारीख',
      placeHolderPaymentEndDate: 'भुगतान की अंतिम तिथि',
      placeHolderInstallmentDate: 'किश्त की तारीख',
      placeHolderBrokerName: 'ब्रोकर का नाम',
      placeHolderBrokerPhone: 'ब्रोकर फोन नंबर',
      placeHolderAddRemainingPayment: 'शेष भुगतान जोड़ें',
      //Arrays
      filterStoreOptions: ['Verified', 'Pending', 'Cancel'],

      //Messages
      msgSelectPaymentMethod: 'कृपया भुगतान विधि का चयन करें!',
      msgInstallmentNotComplete: 'शेष भुगतान 0 होने तक कृपया किश्तें जोड़ें।',
      msgBlankEmailOrPhone: 'कृपया ईमेल या फ़ोन दर्ज करें!',
      msgBlankFields: 'कृपया सभी आवश्यक फ़ील्ड भरें!!',
      msgBlankUserImage: 'कृपया उपयोगकर्ता छवि का चयन करें',
      msgBlankUserPanImage: 'कृपया पैन छवि चुनें',
      msgBlankJointUserPanImage: 'कृपया संयुक्त पैन छवि का चयन करें',
      msgBlankJointUserAadharImage: 'कृपया संयुक्त आधार छवि का चयन करें',
      msgWrongTotalBasicAmount: 'कुल राशि 0 से अधिक होनी चाहिए',
      msgWrongBigInstallmentAmount: 'पहली बड़ी किस्त राशि 0 से अधिक है',
      msgSomethingWrong: 'कुछ गलत हो गया है। कृपया बाद में दोबारा प्रयास करें।',
      msgBlankAllRate: 'कृपया कोई एक दर भरें',
      msgBlankSuperBuildUp: 'सुपर बिल्ट अप के लिए माप का चयन करें',
      msgBlankCarpet: 'फ़र्श के लिए माप का चयन करें',
      msgBlankBuildUp: 'बिल्ट अप के लिए माप का चयन करें',
      msgWrongBudgetValue: 'बजट बजट से अधिक होना चाहिए',

      msgBlankAllArea: 'कृपया क्षेत्र से किसी एक को भरें',
      msgBlankAreaSuperBuiltUp: 'क्षेत्र सुपर निर्मित के लिए माप का चयन करें',
      msgBlankAreaCarpet: 'क्षेत्र फ़र्श के लिए माप का चयन करें',
      msgBlankAreaBuildUp: 'निर्मित क्षेत्र के लिए माप का चयन करें',

      msgBlankTotalAmount: 'कृपया कुल मूल राशि जोड़ें!',

      msgBlankUserAadharImage: 'कृपया आधार छवि का चयन करें',
      msgTermsAndCondition: 'कृपया नियम और शर्तें स्वीकार करें',

      msgBlankFirstName: 'कृपया प्रथम नाम दर्ज करें!',
      msgBlankLastName: 'कृपया अंतिम नाम दर्ज करें!',
      msgBlankPhone: 'कृपया फ़ोन नंबर दर्ज करें!',
      msgBlankEmail: 'कृपया ईमेल दर्ज करें!',
      msgBlankRole: 'कृपया भूमिका दर्ज करें!',
      msgBlankInquiryCategory: 'कृपया जांच श्रेणी का चयन करें!',
      msgBlankInstallmentDate: 'किस्त की तारीख का चयन करें!',
      msgBlankInquiryPriority: 'कृपया मुख्य प्राथमिकता चुनें',
      msgBlankAddress: 'कृपया पता दर्ज करें!',
      msgBlankPassword: 'कृप्या पास्वर्ड भरो!',
      msgBlankConfirmPassword: 'कृपया पुष्टि पासवर्ड दर्ज करें!',
      msgBlankCompany: 'कृपया कंपनी का चयन करें!',
      msgBlankBirthDate: 'कृपया जन्मतिथि का चयन करें!',
      msgBlankState: 'कृपया राज्य चुनें!',
      msgBlankPan: 'कृपया पैन डालें',
      msgBlankAadhar: 'कृपया आधार नंबर दर्ज करें',
      msgBlankAge: 'कृपया उम्र दर्ज करें',
      msgBlankOccupation: 'व्यवसाय दर्ज करें',
      msgBlankCity: 'कृपया शहर चुनें!',
      msgBlankFollowUpDate: 'कृपया अनुवर्ती तिथि चुनें',
      msgBlankStartDate: 'कृपया भुगतान प्रारंभ तिथि दर्ज करें।',
      msgBlankEndDate: 'कृपया भुगतान की अंतिम तिथि दर्ज करें।',

      msgPasswordNotMatch: 'पासवर्ड खुराक से मेल नहीं खाता!',
      msgWrongPhone: 'कृपया सही फ़ोन नंबर दर्ज करें!',
      msgWrongInstallmentLarge: 'आपकी दर्ज राशि शेष भुगतान से बड़ी है',
      msgWrongAlternetPhone: 'कृपया सही वैकल्पिक फ़ोन नंबर दर्ज करें',
      msgWrongEmail: 'कृपया सही ईमेल दर्ज करें!',
      msgWrongAadhar: 'कृपया सही आधार नंबर दर्ज करें',
      msgWrongPan: 'कृपया सही पैन दर्ज करें',
      msgWrongAge: 'कृपया सही उम्र दर्ज करें',
      msgWrongCharge: 'शुल्क 0 से अधिक होना चाहिए',
      msgWrongInstallment: 'किस्त 0 से अधिक होनी चाहिए',
      msgNoDataTitle: 'कोई आकड़ा उपलब्ध नहीं है!',
      msgNoCompanyFound: 'कोई कंपनी नहीं मिली।',
      msgNoBookingFound: 'कोई बुकिंग नहीं मिली.',
      msgNoTaskFound: 'कोई कार्य नहीं मिला।',
      msgNoRoleFound: 'कोई भूमिका नहीं मिली!',
      msgNoUserFound: 'कोई उपयोगकर्ता नहीं मिला!',
      msgNoStateFound: 'कोई राज्य नहीं मिला!',
      msgNoCityFound: 'कोई शहर नहीं मिला!',
      msgNoStructureFound: 'कोई संरचना नहीं मिली!',
      msgNoFilesAndFolder: 'कोई फाइल और फोल्डर नहीं',
      msgNoinquiriesFound: 'कोई पूछताछ नहीं मिली!',
      msgNoPaymentsFound: 'कोई भुगतान नहीं मिला!',
      msgNoFollowUpFound: 'कोई अनुगमन नहीं!',
      msgBlankInstallment: 'कृपया किस्त जोड़ें।',

      paymentInstallment: [{ id: 1, name: 'पूरा भुगतान' }, { id: 2, name: 'कस्टम भुगतान' }, { id: 3, name: 'पहली बड़ी किश्त' }],



    },
  },
};

export default translations;
