import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  invoiceId: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    margin: '10 0',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6c5ce7',
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  textBold: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    borderBottom: '1px solid #EEE',
    paddingBottom: 10,
  },
  dateColumn: {
    flexDirection: 'column',
    width: '30%',
  },
  itemsTable: {
    flexDirection: 'column',
    marginTop: 20,
    borderBottom: '1px solid #EEE',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    borderBottomStyle: 'solid',
    backgroundColor: '#F9F9F9',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    borderBottomStyle: 'solid',
    padding: 5,
  },
  tableCol1: {
    width: '40%',
  },
  tableCol2: {
    width: '20%',
    textAlign: 'center',
  },
  tableCol3: {
    width: '20%',
    textAlign: 'right',
  },
  tableCol4: {
    width: '20%',
    textAlign: 'right',
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableText: {
    fontSize: 10,
  },
  totalsContainer: {
    marginTop: 20,
    paddingTop: 10,
    alignSelf: 'flex-end',
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 10,
    textAlign: 'left',
  },
  totalValue: {
    fontSize: 10,
    textAlign: 'right',
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  grandTotalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    paddingTop: 10,
    borderTop: '1px solid #EEE',
  },
  footerText: {
    fontSize: 8,
    color: '#666',
  },
  status: {
    padding: '4 8',
    borderRadius: 4,
    color: 'white',
    fontSize: 10,
    alignSelf: 'flex-start',
  },
  pending: {
    backgroundColor: '#f39c12',
  },
  paid: {
    backgroundColor: '#27ae60',
  },
  draft: {
    backgroundColor: '#7f8c8d',
  },
});

// Invoice PDF Component
const InvoicePDF = ({ invoice }) => {
  // Calculate totals
  const calculateSubtotal = () => {
    return invoice.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + tax;

  // Get status style
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return styles.paid;
      case 'draft':
        return styles.draft;
      default:
        return styles.pending;
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceId}>{invoice.id}</Text>
            <View style={[styles.status, getStatusStyle(invoice.status)]}>
              <Text>{invoice.status.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.text}>Your Company Name</Text>
            <Text style={styles.text}>{invoice.billFrom.streetAddress}</Text>
            <Text style={styles.text}>
              {invoice.billFrom.city}, {invoice.billFrom.postCode}
            </Text>
            <Text style={styles.text}>{invoice.billFrom.country}</Text>
          </View>
        </View>

        {/* Bill To */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BILL TO</Text>
          <Text style={styles.textBold}>{invoice.clientName}</Text>
          <Text style={styles.text}>{invoice.billTo.clientEmail}</Text>
          <Text style={styles.text}>{invoice.billTo.streetAddress}</Text>
          <Text style={styles.text}>
            {invoice.billTo.city}, {invoice.billTo.postCode}
          </Text>
          <Text style={styles.text}>{invoice.billTo.country}</Text>
        </View>

        {/* Dates */}
        <View style={styles.dates}>
          <View style={styles.dateColumn}>
            <Text style={styles.sectionTitle}>INVOICE DATE</Text>
            <Text style={styles.text}>{format(new Date(invoice.invoiceDate), 'MMMM dd, yyyy')}</Text>
          </View>
          <View style={styles.dateColumn}>
            <Text style={styles.sectionTitle}>PAYMENT TERMS</Text>
            <Text style={styles.text}>{invoice.paymentTerms}</Text>
          </View>
          <View style={styles.dateColumn}>
            <Text style={styles.sectionTitle}>DUE DATE</Text>
            <Text style={styles.text}>{format(new Date(invoice.dueDate), 'MMMM dd, yyyy')}</Text>
          </View>
        </View>

        {/* Project Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROJECT</Text>
          <Text style={styles.text}>{invoice.projectDescription}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.itemsTable}>
          <View style={styles.tableHeader}>
            <View style={styles.tableCol1}>
              <Text style={styles.tableHeaderText}>ITEM</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={styles.tableHeaderText}>QTY</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableHeaderText}>PRICE</Text>
            </View>
            <View style={styles.tableCol4}>
              <Text style={styles.tableHeaderText}>AMOUNT</Text>
            </View>
          </View>

          {invoice.items.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol1}>
                <Text style={styles.tableText}>{item.name}</Text>
              </View>
              <View style={styles.tableCol2}>
                <Text style={styles.tableText}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol3}>
                <Text style={styles.tableText}>${parseFloat(item.price).toFixed(2)}</Text>
              </View>
              <View style={styles.tableCol4}>
                <Text style={styles.tableText}>${parseFloat(item.total).toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totals Section - Fixed and Improved */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (7%)</Text>
            <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business!</Text>
          <Text style={styles.footerText}>
            Payment is due within {invoice.paymentTerms.replace('Net ', '')} of invoice date.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Usage component with preview
const InvoicePDFGenerator = ({ invoice }) => {
    return (
      <PDFDownloadLink
        document={<InvoicePDF invoice={invoice} />}
        fileName={`invoice-${invoice.id}.pdf`}
        className='px-4 py-2 flex items-center bg-violet-500 hover:bg-violet-600 rounded-full'
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download Invoice PDF'
        }
      </PDFDownloadLink>
    );
  };
  
  export default InvoicePDFGenerator;