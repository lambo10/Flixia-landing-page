class Token {
  final String name;
  final String symbol;
  final String contract;
  final String image;

  Token({this.name, this.symbol, this.contract, this.image});

  // Convert a Token into a Map. The keys must correspond to the names of the
  // columns in the database.
  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'symbol': symbol,
      'contract': contract,
      'image': image
    };
  }

  // Implement toString to make it easier to see information about
  // each Token when using the print statement.
  @override
  String toString() {
    return 'Token{name: $name, symbol: $symbol, contract: $contract, image: $image}';
  }
}
